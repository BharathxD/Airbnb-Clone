"use client";

import { toast } from "react-hot-toast";

export const ErrorToast = (message: string, id?: string) => {
  return toast.error(message, {
    duration: 5000,
    id,
    style: {
      minWidth: "max-content",
    },
  });
};

export const SuccessToast = (message: string, id?: string) => {
  return toast.success(message, {
    duration: 5000,
    id,
    style: {
      minWidth: "max-content",
    },
  });
};
