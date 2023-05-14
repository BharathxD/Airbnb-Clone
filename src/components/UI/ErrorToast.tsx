"use client";

import { toast } from "react-hot-toast";

const errorToast = (message: string, id?: string) => {
  return toast.error(message, {
    duration: 10000,
    id,
    style: {
      minWidth: "max-content",
    },
  });
};

export default errorToast;
