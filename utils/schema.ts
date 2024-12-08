import { z, ZodSchema } from "zod";
import { fromError } from "zod-validation-error";
import { Amenity } from "./options";

export const searchPropertyFormSchema = z.object({
  location: z.string().min(2, { message: "Please select a destination" }),
  category: z.string(),
});

export const contactHostFormSchema = z.object({
  propertyId: z.string(),
  senderEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  ownerName: z.string(),
  inquiry: z
    .string()
    .min(10, {
      message:
        "Your inquiry must be at least 10 characters long to provide enough detail.",
    })
    .max(1000, {
      message:
        "Your inquiry is too long! Please keep it under 1000 characters.",
    }),
});

export const reviewFormSchema = z.object({
  propertyId: z.string().readonly(),
  rating: z.string(),
  feedback: z.string().min(2, { message: "feedback is required" }),
});

export const createReviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000),
});
export const createMessageSchema = z.object({
  propertyId: z.string(),
  recipientId: z.string(),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  body: z.string().min(1, { message: "Message is required" }),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  oldImage: z.string().url({ message: "Old Image must be a Url" }),
});

export const createPropertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "property name must be at least 2 characters.",
    })
    .max(100, {
      message: "property name must be less than 100 characters.",
    }),
  category: z.string(),
  price: z.coerce
    .number()
    .int()
    .min(1, {
      message: "price must be a positive number.",
    })
    .max(1000, {
      message: "maximum price per night is 1000",
    }),
  squareFeet: z.coerce.number().int().min(0, {
    message: "square feet must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string(),
  sleeps: z.coerce.number().int().min(1, {
    message: "sleeps amount must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().min(1, {
    message: "bedrooms amount must be a positive number.",
  }),
  bathrooms: z.coerce.number().int().min(1, {
    message: "bathrooms amount must be a positive number.",
  }),
  beds: z.coerce.number().int().min(1, {
    message: "beds amount must be a positive number.",
  }),
  amenities: z.string().refine(
    (amenities) => {
      const amenitiesArr = JSON.parse(amenities) as Amenity[];
      const amenitiesCount = amenitiesArr.filter(
        (amenity) => amenity.selected
      ).length;
      return amenitiesCount > 2;
    },
    {
      message: "please select at least 2 amenities",
    }
  ),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = fromError(result.error);
    console.error(errors);
    throw new Error(errors.toString());
  }
  return result.data;
}

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.includes(file.type);
    }, "File must be a valid image type (JPEG, PNG, WebP, GIF)");
}

export type SearchPropertyFormSchemaType = z.infer<
  typeof searchPropertyFormSchema
>;
