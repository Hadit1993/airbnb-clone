"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

const ClientOnly: FC<PropsWithChildren> = ({ children }) => {
  const [hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
