import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { FC, useCallback, useState } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  description: string;
  Icon: IconType;
  selected: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  label,
  description,
  Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelect = useCallback(() => {
    const currentQuery = params ? qs.parse(params.toString()) : {};
    const { category } = currentQuery;
    // If the user clicks the category which the user has already selected, it will remove the category from the query
    const updatedQuery = {
      ...currentQuery,
      category: category === label ? undefined : label,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition  cursor-pointer 
      ${selected ? "border-b-neutral-800" : "border-transparent"} 
      ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
      onClick={handleSelect}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
