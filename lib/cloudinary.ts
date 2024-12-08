import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfileImage = async (imageFile: File) => {
  const imageBuffer = await imageFile.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);

  //convert to base64
  const imageBase64 = imageData.toString("base64");

  // makes request to cloudinary
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,
    {
      folder: "profile",
    }
  );

  return result.secure_url;
};

export const deleteProfileImage = async (imageUrl: string) => {
  const publicId = imageUrl.split("/").at(-1)?.split(".").at(0);
  if (!publicId) {
    throw new Error("Invalid image URL. Public ID could not be extracted.");
  }
  const response = await cloudinary.uploader.destroy(`profile/${publicId}`);

  if (response.result !== "ok") {
    throw new Error(`Failed to delete image. Response: ${response.result}`);
  }
};

export const uploadPropertyImages = async (images: File[]) => {
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //convert to base64
    const imageBase64 = imageData.toString("base64");

    // makes request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "dream-rentals",
      }
    );
    imageUrls.push(result.secure_url);
  }
  return imageUrls;
};

export const deletePropertyImages = async (images: string[]) => {
  const publicIds = images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  });
  if (!publicIds) {
    throw new Error("Invalid image URLS. Public ID could not be extracted.");
  }
  //deleteImages from clouding
  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(`dream-rentals/${publicId}`);
    }
  }
};

export default cloudinary;
