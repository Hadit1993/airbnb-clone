"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { FC } from "react";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";

interface DescriptionBodyContentProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const DescriptionBodyContent: FC<DescriptionBodyContentProps> = ({
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subTitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        disabled={disabled}
        register={register}
        errors={errors}
      />

      <Input
        id="description"
        label="Description"
        disabled={disabled}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default DescriptionBodyContent;
