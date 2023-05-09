"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { FC } from "react";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";

interface PriceBodyContentProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const PriceBodyContent: FC<PriceBodyContentProps> = ({
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subTitle="How much do you charge per night?"
      />
      <Input
        id="price"
        label="Price"
        formatPrice
        type="number"
        disabled={disabled}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default PriceBodyContent;
