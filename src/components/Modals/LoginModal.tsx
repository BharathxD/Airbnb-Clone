"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  ValidationRule,
  useForm,
} from "react-hook-form";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../UI/Heading";
import Input from "../UI/Input";
import { toast } from "react-hot-toast";
import Button from "../UI/Button";
import errorToast from "../UI/ErrorToast";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    toast.loading(`Please wait, ${data.name}!`, {
      id: "loading",
    });

    try {
      const response = await axios.post(`/api/login`, data);
      toast.dismiss("loading");

      if (response.status !== 200) {
        throw new Error("Oops! Something went wrong.");
      }

      loginModal.onClose();
    } catch (error: any) {
      toast.dismiss("loading");
      if (error?.response?.status === 404) {
        errorToast("User doesn't exist.");
      } else {
        errorToast("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="flex flex-col gap-5">
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        minLength={6}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex gap-2">
        <Button icon={FcGoogle} label="Google" onClick={() => {}} outline />
        <Button icon={AiFillGithub} label="Github" onClick={() => {}} outline />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Don&apos;t have an account?</div>
          <div
            className="text-neutral-600 cursor-pointer hover:underline font-medium"
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footerContent}
    />
  );
};

export default LoginModal;
