"use client";

import useSearchModal from "@/hooks/useSearchModal";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      className="border-[1px] w-full md:w-auto py-1.5 rounded-full shadow-md hover:shadow-md transition cursor-pointer"
      onClick={() => searchModal.onOpen()}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-5">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-5 border-x-[1px] flex-1 text-center">
          Any week
        </div>
        <div className="text-sm pl-5 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden font-light md:block">Add guests</div>
          <div className="p-[0.60rem] bg-rose-500 rounded-full text-white">
            <FaSearch size={13} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
