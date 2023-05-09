"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { AiFillGithub } from "react-icons/ai";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

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
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const BodyContent = () => (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Login to your account" />
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
        required
      />
    </div>
  );

  const FooterContent = () => (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          First time using Airbnb?
        </div>
        <div
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Create an account
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={<BodyContent />}
      footer={<FooterContent />}
    />
  );
};

export default LoginModal;
