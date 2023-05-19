"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";

import Modal from "./Modal";
import Heading from "../UI/Heading";
import Input from "../Inputs/Input";
import Button from "../UI/Button";
import { ErrorToast } from "../UI/Toast";
import useLoginModal from "@/hooks/useLoginModal";
import { StatusCodes } from "http-status-codes";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/register`, data);

      if (response.status !== StatusCodes.OK) {
        throw new Error("Oops! Something went wrong.");
      }

      registerModal.onClose();
      reset();
    } catch (error: any) {
      if (error?.response?.status === StatusCodes.CONFLICT) {
        ErrorToast(
          "User already exists. Please try again with a different email."
        );
      } else {
        ErrorToast("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="flex flex-col gap-5">
      <Heading title="Welcome to Airbnb" center />
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
        id="name"
        label="Name"
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
      <Button
        icon={FcGoogle}
        label="Continue with Google"
        onClick={() => {
          signIn("google");
        }}
        outline
      />
      <Button
        icon={AiFillGithub}
        label="Continue with Github"
        onClick={() => {
          signIn("github");
        }}
        outline
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            className="text-neutral-600 cursor-pointer hover:underline font-medium"
            onClick={toggle}
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Log in or sign up"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
