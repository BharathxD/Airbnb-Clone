"use client";

import { FC, Fragment, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../UI/Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import Language from "./Language";

interface UserMenuProps {
  currentUser: SafeUser | null | undefined;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // TODO: Open Rent Modal
  }, [currentUser, loginModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer mr-[-10px]"
        >
          Airbnb your home
        </div>
        <Language />
        <div
          onClick={() => {
            toggleOpen();
          }}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-3 xl:mt-2 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 text-sm border-[1px]">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <Fragment>
                <MenuItem onClick={() => {}} label="My Trips" />
                <MenuItem onClick={() => {}} label="My Favorites" />
                <MenuItem onClick={() => {}} label="My Reservations" />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem onClick={() => {}} label="Airbnb my Home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label="Logout"
                />
              </Fragment>
            ) : (
              <Fragment>
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                  }}
                  label="Sign Up"
                  bold
                />
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
                <hr />
                <MenuItem onClick={() => {}} label="Airbnb your home" />
                <MenuItem onClick={() => {}} label="Help" />
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
