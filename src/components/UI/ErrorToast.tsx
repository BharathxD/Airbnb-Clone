"use client";

import { toast } from "react-hot-toast";

const ErrorToast = (message: string, id?: string) => {
  return toast.error(message, {
    duration: 5000,
    id,
    style: {
      minWidth: "max-content",
    },
  });
};

export default ErrorToast;
