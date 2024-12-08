"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useRef } from "react";
import { imageSchema, validateWithZodSchema } from "@/utils/schema";
import { toast } from "@/hooks/use-toast";
import placeHolderImage from "@/assets/images/blurhouse.jpg";
function ImageInput({
  oldImages = [],
  propertyName,
  required,
}: {
  oldImages?: string[];
  propertyName: string;
  required: boolean;
}) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(oldImages);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const name = "images";
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length < 6 || files.length > 10) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setPreviewUrls(oldImages);

      toast({
        description:
          "Please add a minimum of 6 images and a maximum of 10 images.",
        variant: "destructive",
      });
    } else {
      const verifiedUrls: string[] = [];
      for (const file of files) {
        try {
          validateWithZodSchema(imageSchema, { image: file });
          const reader = new FileReader();
          reader.onload = () => {
            verifiedUrls.push(reader.result as string);
            if (verifiedUrls.length === files.length) {
              setPreviewUrls(verifiedUrls);
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          setPreviewUrls(oldImages);
          console.error(error);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          toast({
            description:
              error instanceof Error ? error.message : "An error occurred",
            variant: "destructive",
          });
          break;
        }
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      setPreviewUrls(oldImages);
    }
  };

  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Property Images (6 - 10 images)
      </Label>
      <Label
        htmlFor={name}
        className="max-w-xs flex cursor-pointer h-[36px] relative items-center px-3 py-1 bg-transparent border rounded-md"
      >
        <Input
          ref={fileInputRef}
          id={name}
          name={name}
          type="file"
          required={required}
          accept="image/*"
          multiple
          onFocus={(e) => handleFocus(e)}
          onChange={(e) => handleFileChange(e)}
          className="opacity-0 absolute inset-0 size-full"
        />
        <span className="text-xs block">
          {previewUrls.length > 0
            ? `Update Images - ${previewUrls.length} Images Chosen`
            : " Upload Images - No Image Chosen"}
        </span>
      </Label>
      <span className="text-xs font-light">
        Recommended size 1:1, up to 1MB for each image.
      </span>

      <div className="flex gap-2 flex-wrap w-full">
        {previewUrls.map((url) => (
          <Image
            key={url}
            width={80}
            height={80}
            alt={propertyName}
            src={url}
            priority
            placeholder="blur"
            blurDataURL={placeHolderImage.blurDataURL}
            className="rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
export default ImageInput;
