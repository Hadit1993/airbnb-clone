"use client";

import { FC, useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";

const UserMenu: FC<{ currentUser?: User | null }> = ({ currentUser }) => {
  const [isOpen, makeOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    makeOpen((val) => !val);
  }, []);

  const onItemClick = (onClick: () => void) => () => {
    toggleOpen();
    onClick();
  };

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    rentModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onclick={onItemClick(() => {})} label="My trips" />
                <MenuItem
                  onclick={onItemClick(() => {})}
                  label="My favorites"
                />
                <MenuItem
                  onclick={onItemClick(() => {})}
                  label="My reservations"
                />
                <MenuItem
                  onclick={onItemClick(() => {})}
                  label="My properties"
                />
                <MenuItem
                  onclick={onItemClick(rentModal.onOpen)}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onclick={onItemClick(signOut)} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onclick={onItemClick(loginModal.onOpen)}
                  label="Login"
                />
                <MenuItem
                  onclick={onItemClick(registerModal.onOpen)}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
