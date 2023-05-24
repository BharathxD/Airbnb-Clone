"use client";

import Image from "next/image";
import { FC, Fragment, useCallback, useState } from "react";
import Dropzone, { Accept, FileRejection } from "react-dropzone";

import { IoCloudDone } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";
import { TbCloudUpload, TbPhotoPlus } from "react-icons/tb";

import { uploadToS3, deleteFromS3 } from "@/utils/s3";
import showToast from "../UI/Toast";

interface ImageUploadProps {
  onImageChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onImageChange, value }) => {
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };
  const [isLoading, setIsLoading] = useState(false);
  const isImageSelected = value !== "";

  const handleImageUpload = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      try {
        if (fileRejections.length > 0) {
          return;
        }

        const file = acceptedFiles[0];
        setIsLoading(true);
        const key = await uploadToS3(file);

        if (!key) {
          throw new Error("Something went wrong");
        }

        onImageChange(key);
        setIsLoading(false);
      } catch (error: any) {
        console.log(`Error uploading the image: ${error.message}`);
        showToast("Something went wrong, please try again later", "error");
        setIsLoading(false);
      }
    },
    [onImageChange]
  );

  const handleRemove = async () => {
    try {
      if (value) {
        const isDeleted = await deleteFromS3(value);
        if (!isDeleted) {
          throw new Error("Cannot delete the picture");
        }
        onImageChange("");
        showToast("Deleted the picture", "success");
      }
    } catch (error: any) {
      console.log(error.message);
      showToast("Cannot delete the picture", "error");
    }
  };

  const renderUploadState = useCallback(() => {
    if (isLoading) {
      return (
        <Fragment>
          <TbCloudUpload size={50} />
          <div className="font-semibold text-lg">Uploading...</div>
        </Fragment>
      );
    }

    if (value) {
      return (
        <Fragment>
          <IoCloudDone size={50} color="green" />
          <div className="font-semibold text-lg">Upload complete!</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
      </Fragment>
    );
  }, [isLoading, value]);

  return (
    <Dropzone
      accept={acceptedFileTypes}
      multiple={false}
      onDrop={handleImageUpload}
      disabled={isImageSelected || isLoading}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`relative transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-lg ${
            isLoading && "animate-pulse"
          } ${!isImageSelected && "hover:opacity-70 cursor-pointer"}`}
          aria-disabled={isLoading}
          aria-label={
            isLoading ? "Uploading image" : "Drop or click to upload image"
          }
        >
          <input {...getInputProps()} required />
          {renderUploadState()}
          {isImageSelected && (
            <div
              className="absolute z-10 top-1.5 right-1.5"
              onClick={handleRemove}
            >
              <IoMdRemoveCircle
                className="text-rose-500 cursor-pointer hover:text-rose-400"
                size={30}
              />
            </div>
          )}
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                className="rounded-lg"
                style={{ objectFit: "cover" }}
                src={value}
                alt="House"
                fill
              />
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
