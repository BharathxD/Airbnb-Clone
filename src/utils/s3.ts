import axios from "axios";
import { StatusCodes } from "http-status-codes";

/**
 * This is a TypeScript function that uploads a file to an S3 bucket and returns the URL of the
 * uploaded file.
 * @param {File} file - The `file` parameter is of type `File`, which is a built-in JavaScript object
 * representing a file uploaded by the user through an HTML input element of type "file". It contains
 * information about the file such as its name, type, and size, as well as the actual file data.
 * @returns a Promise that resolves to a string representing the full URL of the uploaded file on S3,
 * or undefined if the upload fails.
 */
export const uploadToS3 = async (file: File): Promise<string | undefined> => {
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

/**
 * This function deletes an image from an S3 bucket and returns a boolean indicating whether the
 * deletion was successful or not.
 * @param {string} fullImageUrl - The `fullImageUrl` parameter is a string that represents the full URL
 * of an image stored in an S3 bucket. This function uses the AWS SDK to delete the image from the S3
 * bucket.
 * @returns a Promise that resolves to a boolean value. If the object is successfully deleted from S3,
 * the Promise resolves to `true`. If there is an error while deleting the object, the Promise resolves
 * to `false`.
 */
export const deleteFromS3 = async (fullImageUrl: string): Promise<boolean | null> => {
  const image = encodeURIComponent(fullImageUrl);
  try {
    const response = await axios.post(`/api/media?key=${image}`);
    if (response.status !== StatusCodes.OK) {
      throw new Error("Something went wrong, the object can't be deleted");
    }
    return true;
  } catch (error: any) {
    console.error("Failed to upload file to S3:", error);
    return null;
  }
};
