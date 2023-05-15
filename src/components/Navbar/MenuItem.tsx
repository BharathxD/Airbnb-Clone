"use client";

import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  bold?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label, bold }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-neutral-100 transistion ${
        bold ? "font-bold" : "font-semibold"
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
