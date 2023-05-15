"use client";

import { FC } from "react";
import Container from "../UI/Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/Gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../UI/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constants/Categories";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            Icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
