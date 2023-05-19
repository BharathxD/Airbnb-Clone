"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../Inputs/Input";
import Button from "../UI/Button";
import { ErrorToast, SuccessToast } from "../UI/Toast";
import useRegisterModal from "@/hooks/useRegisterModal";
import { StatusCodes } from "http-status-codes";
import Heading from "../UI/Heading";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.ok) {
        SuccessToast("Logged In");
        loginModal.onClose();
        router.refresh();
        return reset();
      }

      if (response?.status === StatusCodes.UNAUTHORIZED) {
        return ErrorToast(response?.error!);
      }

      throw new Error("Oops! Something went wrong. Please try again later.");
    } catch (error: any) {
      ErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="flex flex-col gap-5">
      <Heading title="Welcome Back!" subtitle="Login to your account" center />
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
        <Button
          icon={FcGoogle}
          label="Google"
          onClick={() => {
            signIn("google");
          }}
          outline
        />
        <Button
          icon={AiFillGithub}
          label="Github"
          onClick={() => {
            signIn("github");
          }}
          outline
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Don&apos;t have an account?</div>
          <div
            className="text-neutral-600 cursor-pointer hover:underline font-medium"
            onClick={toggle}
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
