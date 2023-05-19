"use client";

import { FC, Fragment, useCallback, useState } from "react";
import { IoCloudDone } from "react-icons/io5";
import { TbCloudUpload, TbPhotoPlus } from "react-icons/tb";
import Dropzone, { Accept, FileRejection } from "react-dropzone";
import Image from "next/image";
import uploadToS3 from "@/utils/s3";

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

        if (key) {
          onChange(key);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [onChange]
  );

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
            className={`relative cursor-pointer transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-lg ${
              isLoading && "animate-pulse"
            } ${value !== "" && "hover:opacity-70"}`}
          >
            <input {...getInputProps()} />
            {renderUploadState()}
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
