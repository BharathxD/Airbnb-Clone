"use client";

import { FC, Fragment, useCallback, useState } from "react";
import { IoCloudDone } from "react-icons/io5";
import { TbCloudUpload, TbPhotoPlus } from "react-icons/tb";
import Dropzone, { Accept, FileRejection } from "react-dropzone";
import Image from "next/image";
import { uploadToS3, deleteFromS3 } from "@/utils/s3";
import { IoMdRemoveCircle } from "react-icons/io";
import { toast } from "react-hot-toast";
import { ErrorToast, SuccessToast } from "../UI/Toast";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };
  const [isLoading, setIsLoading] = useState(false);

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

        onChange(key);
        setIsLoading(false);
      } catch (error: any) {
        console.log(`Error uploading the image: ${error.message}`);
        ErrorToast("Something went wrong, please try again later");
        setIsLoading(false);
      }
    },
    [onChange]
  );

  const handleRemove = async () => {
    try {
      if (value) {
        const isDeleted = await deleteFromS3(value);
        if (isDeleted) {
          onChange("");
          SuccessToast("Deleted the picture");
        }
      }
    } catch (error: any) {
      console.log(error.message);
      ErrorToast("Cannot delete the picture");
    }
  };

  const renderUploadState = () => {
    if (isLoading) {
      return (
        <Fragment>
          <TbCloudUpload size={50} />
          <div className="font-semibold text-lg">Uploading</div>
        </Fragment>
      );
    }

    if (value) {
      return (
        <Fragment>
          <IoCloudDone size={50} color="green" />
          <div className="font-semibold text-lg">Done!</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
      </Fragment>
    );
  };

  return (
    <div>
      <Dropzone
        accept={acceptedFileTypes}
        multiple={false}
        onDrop={handleImageUpload}
        disabled={value !== ""}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`relative transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-lg ${
              isLoading && "animate-pulse"
            } ${value === "" && "hover:opacity-70 cursor-pointer"}`}
          >
            <input {...getInputProps()} />
            {renderUploadState()}
            {value !== "" && (
              <div
                className="absolute z-10 top-1 right-1"
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
    </div>
  );
};

export default ImageUpload;
