import uploadToS3 from "@/utils/s3";
import Image from "next/image";
import { FC, FormEvent, useCallback } from "react";
import Dropzone, { useDropzone, Accept, DropEvent } from "react-dropzone";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string | undefined) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };
  const handleImageUpload = useCallback(
    async (acceptedFile: File[]) => {
      const file = acceptedFile[0] as File;
      const key = await uploadToS3(file);
      onChange(key);
    },
    [onChange]
  );
  return (
    <div>
      <Dropzone
        accept={acceptedFileTypes}
        multiple={false}
        onDrop={handleImageUpload}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-lg"
          >
            <input {...getInputProps()} />
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="House"
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
