"use client";

import { FC } from "react";
import Image from "next/image";

const Avatar: FC<{ src?: string | null }> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src ?? "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
