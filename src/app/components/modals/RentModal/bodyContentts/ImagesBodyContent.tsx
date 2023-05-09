"use client";

import React, { FC } from "react";

import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/inputs/ImageUpload";

interface ImagesBodyContentProps {
  value: string;
  onChange: (value: string) => void;
}
const ImagesBodyContent: FC<ImagesBodyContentProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subTitle="SHow guests what yur place looks like?"
      />

      <ImageUpload value={value} onChange={onChange} />
    </div>
  );
};

export default ImagesBodyContent;
