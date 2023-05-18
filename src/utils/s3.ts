import axios from "axios";

const uploadToS3 = async (file: File): Promise<string | undefined> => {
  if (!file || file.name === "") {
    throw new Error("Invalid file");
  }
  const fileType = encodeURIComponent(file.type);
  try {
    const { data } = await axios.get(`/api/media?fileType=${fileType}`);
    const { s3UploadUrl, fullUrl } = data;
    await axios.put(s3UploadUrl, file);
    return fullUrl;
  } catch (error: any) {
    console.error("Failed to upload file to S3:", error);
  }
};

export default uploadToS3;
