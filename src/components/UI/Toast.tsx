"use client";

import { toast } from "react-hot-toast";

const showToast = (message: string, type: "error" | "success", id?: string) => {
  const options = {
    duration: 5000,
    id,
    style: {
      minWidth: "max-content",
    },
  };

  if (type === "error") return toast.error(message, options);

  return toast.success(message, options);
};

export default showToast;
