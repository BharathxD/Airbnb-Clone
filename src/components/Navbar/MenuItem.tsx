"use client";

import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  bold?: boolean;
  disabled?: boolean;
}

/**
 * This function retrieves the current user's information from the database and returns it in a
 * standardized format, or null if the user is not authenticated or does not exist.
 * @returns The function `getCurrentUser` returns a Promise that resolves to a `SafeUser` object or
 * `null`. The `SafeUser` object is created by spreading the properties of the `currentUser` object
 * returned from the database query and converting some of the date properties to ISO strings. If there
 * is no `session` or `session.user.email` is falsy, the function returns `null`. If
 */
const MenuItem: FC<MenuItemProps> = ({ onClick, label, bold, disabled }) => {
  const clickHandler = () => {
    if (disabled) return;
    return onClick();
  };
  return (
    <div
      onClick={clickHandler}
      className={`px-4 py-3 hover:bg-neutral-100 transistion ${
        bold ? "font-bold" : "font-semibold-400"
      } ${
        disabled && "bg-neutral-300 hover:bg-neutral-300 cursor-not-allowed"
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
