import { FC } from "react";
import Dropzone, { useDropzone, Accept } from "react-dropzone";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps> = () => {
  const { getRootProps, getInputProps, open } = useDropzone();
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };
  return (
    <div>
      <Dropzone accept={acceptedFileTypes}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-lg"
          >
            <input {...getInputProps()} />
            <TbPhotoPlus />
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUpload;
