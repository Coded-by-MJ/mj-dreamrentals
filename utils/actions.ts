"use server";

import db from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { actionState, LocationObj, SearchParamsType, UserType } from "./types";

import {
  createMessageSchema,
  createPropertySchema,
  createReviewSchema,
  imageSchema,
  profileSchema,
  validateWithZodSchema,
} from "./schema";
import { calculateTotals } from "./calculateTotals";

import { currentUser, clerkClient } from "@clerk/nextjs/server";
import {
  deleteProfileImage,
  deletePropertyImages,
  uploadProfileImage,
  uploadPropertyImages,
} from "@/lib/cloudinary";
import { Amenity } from "./options";
import { Prisma } from "@prisma/client";

const renderError = (error: unknown): actionState => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("unknown error occurred");
  }
  return {
    message: error instanceof Error ? error.message : "An error occurred",
    variant: "destructive",
  };
};

export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  if (!user.privateMetadata.userType) redirect("/");
  return user;
};

export const createUserProfile = async (userType: UserType) => {
  const user = await currentUser();
  if (!user) throw new Error("Please login to create a profile");

  try {
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl || "",
        userType,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      },
    });
    const { users } = await clerkClient();
    users.updateUserMetadata(user.id, {
      privateMetadata: {
        userType,
      },
    });
  } catch (error) {
    renderError(error);
  }
};

export const fetchUserProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) throw new Error("Please login to create a profile");
  return profile;
};

export const updateUserTypeAction = async (): Promise<actionState> => {
  const user = await getAuthUser();
  try {
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        userType: "OWNER",
      },
    });
    const { users } = await clerkClient();
    users.updateUserMetadata(user.id, {
      privateMetadata: {
        userType: "OWNER",
      },
    });
    revalidatePath("/", "layout");
    return {
      message: "Congratulations, You are now a property owner.",
      variant: "default",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const updateUserProfile = async (
  prevState: any,
  formData: FormData
): Promise<actionState> => {
  const user = await getAuthUser();
  try {
    const { users } = await clerkClient();
    const rawData = Object.fromEntries(formData);
    const newImage = (formData.getAll("imageUrl") as File[]).filter(
      (image) => image.size > 0
    );

    const validatedFields = validateWithZodSchema(profileSchema, rawData);
    let imageUrl = validatedFields.oldImage;
    if (newImage.length > 0) {
      const validatedImageFile = validateWithZodSchema(imageSchema, {
        image: newImage[0],
      });
      await users.updateUserProfileImage(user.id, {
        file: validatedImageFile.image,
      });
      imageUrl = await uploadProfileImage(validatedImageFile.image);
    }

    if (validatedFields.oldImage.startsWith("https://res.cloudinary.com")) {
      await deleteProfileImage(validatedFields.oldImage);
    }

    await users.updateUser(user.id, {
      firstName: validatedFields.firstName,
      lastName: validatedFields.lastName,
    });

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        firstName: validatedFields.firstName,
        lastName: validatedFields.lastName,
        imageUrl,
      },
    });

    revalidatePath(`/`, "layout");
    return { message: "Profile updated successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
};

export const profileExists = async (userId: string): Promise<boolean> => {
  const userInDatabase = await db.profile.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return userInDatabase ? true : false;
};

export const confirmUserIsOwner = async (userId: string | null) => {
  if (!userId) {
    return false;
  }
  const user = await db.profile.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      userType: true,
    },
  });

  return user?.userType === "OWNER";
};

export const fetchAllProperties = async (searchParams: SearchParamsType) => {
  const limit = 10;
  const skip = (searchParams.page - 1) * limit;
  let whereClause: Prisma.PropertyWhereInput = {};

  try {
    if (searchParams.location) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            name: { contains: searchParams.location, mode: "insensitive" },
          },
          {
            description: {
              contains: searchParams.location,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (searchParams.category && searchParams.category !== "All") {
      whereClause = {
        ...whereClause,
        category: {
          equals: searchParams.category,
          mode: "insensitive",
        },
      };
    }
    const properties = await db.property.findMany({
      where: whereClause,
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count: number = await db.property.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / limit);

    return { properties, totalPages, count };
  } catch (error) {
    renderError(error);
    return { properties: [], totalPages: 0, count: 0 };
  }
};

export const fetchFeaturedProperties = async () => {
  const properties = await db.property.findMany({
    where: {
      isFeatured: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};

export const fetchRecentProperties = async () => {
  const properties = await db.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return properties;
};

export const fetchSingleProperty = async (id: string) => {
  const property = await db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      bookings: {
        where: {
          paymentStatus: true,
        },
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });

  if (!property) {
    redirect("/properties");
  }
  return property;
};

export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: {
      propertyId,
    },
    include: {
      profile: true,
    },
  });

  return reviews;
};

export async function createReviewAction(
  prevState: any,
  formData: FormData
): Promise<actionState> {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(createReviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    });
    revalidatePath(`/properties/${validatedFields.propertyId}`);
    return { message: "Review submitted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
}

export const findExistingReview = async (
  userId: string,
  propertyId: string
) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      propertyId: propertyId,
    },
  });
};

export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          name: true,
          images: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: {
  reviewId: string;
}): Promise<actionState> => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}): Promise<actionState> => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath("/favorites");
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from Faves" : "Added to Faves",
      variant: "default",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: true,
    },
  });

  return favorites.map((favorite) => favorite.property);
};

export async function createMessageAction(
  prevState: any,
  formData: FormData
): Promise<actionState> {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(createMessageSchema, rawData);

    if (user.id === validatedFields.recipientId) {
      throw new Error("You can't send messages to yourself");
    }

    await db.message.create({
      data: {
        ...validatedFields,
        senderId: user.id,
      },
    });
    revalidatePath(`/properties/${validatedFields.propertyId}`);
    return { message: "Message sent successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
}

export const fetchPropertyRating = async (propertyId: string) => {
  const result = await db.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });

  return {
    rating: result[0]?._avg.rating?.toFixed(1) || 0,
    count: result[0]?._count.rating || 0,
  };
};

export const createBookingAction = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  allGuests: number;
}): Promise<actionState> => {
  const user = await getAuthUser();
  await db.booking.deleteMany({
    where: {
      profileId: user.id,
      paymentStatus: false,
    },
  });
  let bookingId: null | string = null;

  const { propertyId, checkIn, checkOut, allGuests } = prevState;
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });
  if (!property) {
    return { message: "Property not found", variant: "destructive" };
  }
  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });

  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId,
        guests: allGuests,
      },
    });
    bookingId = booking.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?bookingId=${bookingId}`);
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
      paymentStatus: true,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      checkIn: "desc",
    },
  });
  return bookings;
};

export async function deleteBookingAction(prevState: {
  bookingId: string;
}): Promise<actionState> {
  const { bookingId } = prevState;
  const user = await getAuthUser();

  try {
    const result = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    });

    revalidatePath("/bookings");
    return { message: "Booking deleted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
}

export const fetchRentals = async () => {
  const user = await getAuthUser();
  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  const rentalsWithBookingSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          totalNights: true,
        },
      });

      const orderTotalSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      };
    })
  );

  return rentalsWithBookingSums;
};

export async function deleteRentalAction(prevState: {
  propertyId: string;
  oldImages: string[];
}): Promise<actionState> {
  const { propertyId, oldImages } = prevState;
  const user = await getAuthUser();

  try {
    await db.property.delete({
      where: {
        id: propertyId,
        profileId: user.id,
      },
    });

    await deletePropertyImages(oldImages);

    revalidatePath("/dashboard/rentals");
    return { message: "Property deleted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
}

export const fetchReservations = async () => {
  const user = await getAuthUser();

  const reservations = await db.booking.findMany({
    where: {
      paymentStatus: true,
      propertyId: {
        in: (
          await db.property.findMany({
            where: { profileId: user.id },
            select: { id: true },
          })
        ).map((property) => property.id),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return reservations;
};

export const fetchReservationStats = async () => {
  const user = await getAuthUser();

  const properties = await db.property.count({
    where: {
      profileId: user.id,
    },
  });

  const totals = await db.booking.aggregate({
    _sum: {
      orderTotal: true,
      totalNights: true,
    },
    where: {
      paymentStatus: true,
      propertyId: {
        in: (
          await db.property.findMany({
            where: { profileId: user.id },
            select: { id: true },
          })
        ).map((property) => property.id),
      },
    },
  });

  return {
    properties,
    nights: totals._sum.totalNights || 0,
    amount: totals._sum.orderTotal || 0,
  };
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const rawFiles = (formData.getAll("images") as File[]).filter(
      (image) => image.size > 0
    );
    const validatedFiles: File[] = [];

    const validatedFields = validateWithZodSchema(
      createPropertySchema,
      rawData
    );
    for (const file of rawFiles) {
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      validatedFiles.push(validatedFile.image);
    }

    const amenities = (
      JSON.parse(validatedFields.amenities) as Amenity[]
    ).filter((amenity) => amenity.selected);
    const location: LocationObj = {
      address: validatedFields.address,
      city: validatedFields.city,
      state: validatedFields.state,
      country: validatedFields.country,
    };
    const images = await uploadPropertyImages(validatedFiles);

    await db.property.create({
      data: {
        name: validatedFields.name,
        category: validatedFields.category,
        price: validatedFields.price,
        description: validatedFields.description,
        bedrooms: validatedFields.bedrooms,
        bathrooms: validatedFields.bathrooms,
        beds: validatedFields.beds,
        sleeps: validatedFields.sleeps,
        squareFeet: validatedFields.squareFeet,
        location,
        amenities,
        images,
        profileId: user.id,
      },
    });
    revalidatePath("/", "layout");
    // return { message: "Rental created successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/rentals");
};

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser();

  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  });
};

export const updatePropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<actionState> => {
  const user = await getAuthUser();
  const propertyId = formData.get("id") as string;
  const oldImages = (formData.get("oldImages") as string).split(",");
  const rawFiles = (formData.getAll("images") as File[]).filter(
    (image) => image.size > 0
  );

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(
      createPropertySchema,
      rawData
    );
    const amenities = (
      JSON.parse(validatedFields.amenities) as Amenity[]
    ).filter((amenity) => amenity.selected);
    const location: LocationObj = {
      address: validatedFields.address,
      city: validatedFields.city,
      state: validatedFields.state,
      country: validatedFields.country,
    };

    let newImages: string[] = [];

    if (rawFiles.length > 0) {
      const validatedFiles: File[] = [];
      for (const file of rawFiles) {
        const validatedFile = validateWithZodSchema(imageSchema, {
          image: file,
        });
        validatedFiles.push(validatedFile.image);
      }
      const images = await uploadPropertyImages(validatedFiles);
      newImages = images;
      await deletePropertyImages(oldImages);
    } else {
      newImages = oldImages;
    }

    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        name: validatedFields.name,
        category: validatedFields.category,
        price: validatedFields.price,
        description: validatedFields.description,
        bedrooms: validatedFields.bedrooms,
        bathrooms: validatedFields.bathrooms,
        beds: validatedFields.beds,
        sleeps: validatedFields.sleeps,
        squareFeet: validatedFields.squareFeet,
        location,
        amenities,
        images: newImages,
      },
    });

    revalidatePath("/", "layout");
    revalidatePath(`/dashboard/rentals/${propertyId}/edit`);
    // return { message: "Update Successful", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/rentals");
};

export const fetchUnreadMessagesCount = async (): Promise<number> => {
  const user = await getAuthUser();
  return await db.message.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });
};

export const fetchMessages = async () => {
  const user = await getAuthUser();
  const allMessages = await db.message.findMany({
    where: {
      recipientId: user.id,
    },
    include: {
      sender: true,
      property: true,
    },
  });

  return allMessages;
};

export const updateMessageRead = async (id: string): Promise<actionState> => {
  const user = await getAuthUser();
  try {
    await db.message.update({
      where: {
        id,
        recipientId: user.id,
      },
      data: {
        read: true,
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/dashboard/messages");
    return {
      message: "Message Read",
      variant: "default",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteMessageAction = async (prevState: {
  messageId: string;
}): Promise<actionState> => {
  const { messageId } = prevState;
  const user = await getAuthUser();

  try {
    await db.message.delete({
      where: {
        id: messageId,
        recipientId: user.id,
      },
    });

    revalidatePath("/dashboard/messages");
    // return { message: "Message deleted successfully", variant: "default" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/messages");
};
