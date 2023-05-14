"use client";

import { toast } from "react-hot-toast";

const errorToast = (message: string, id?: string) => {
  return toast.error(message, {
    duration: 10000,
    id,
  });
};

export default errorToast;
