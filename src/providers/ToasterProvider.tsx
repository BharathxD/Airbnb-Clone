"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  // As I'm using third-party toast, it's better use provider
  return <Toaster />;
};

export default ToasterProvider;
