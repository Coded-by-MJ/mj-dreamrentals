"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { imageSchema, validateWithZodSchema } from "@/utils/schema";
import { toast } from "@/hooks/use-toast";

function ProfileImage({
  profileImage,
  name,
}: {
  profileImage: string;
  name: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string>(profileImage);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    try {
      if (file) {
        validateWithZodSchema(imageSchema, { image: file });
        const reader = new FileReader();
        reader.onload = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
      }
    } catch (error) {
      setPreviewUrl(profileImage);
      console.error(error);
      toast({
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Image
        src={previewUrl}
        alt={name}
        width={200}
        height={200}
        priority
        placeholder="empty"
        className="rounded-full object-cover w-[200px] h-[200px]"
      />

      <div className="flex flex-col gap-1 w-[200px]">
        <Label
          className="p-1.5 bg-primary text-sm rounded-sm border w-[120px] text-center"
          htmlFor="imageUrl"
        >
          <Input
            id={"imageUrl"}
            name={"imageUrl"}
            type="file"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
            className="hidden"
          />
          Upload Image
        </Label>
        <span className="text-xs font-light">
          Recommended size 1:1, up to 1MB.
        </span>
      </div>
    </div>
  );
}
export default ProfileImage;
