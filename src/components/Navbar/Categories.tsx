"use client";

import { FC } from "react";
import Container from "../UI/Container";
import CategoryBox from "../UI/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constants/Categories";

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  // If it's not mainpage return null
  if (!isMainPage) return null;

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
