"use client";

import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  bold?: boolean;
  disabled?: boolean;
}

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
