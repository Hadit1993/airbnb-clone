"use client";

import Categories from "./Categories";
import Container from "../Container";
import { FC } from "react";
import Logo from "./Logo";
import Search from "./Search";
import { User } from "@prisma/client";
import UserMenu from "./UserMenu";

const Navbar: FC<{ currentUser?: User | null }> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
