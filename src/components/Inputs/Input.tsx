"use client";

import { FC, Fragment } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  id: string;
  label: string;
  minLength?: number;
}

const Input: FC<InputProps> = ({
  id,
  label,
  required,
  formatPrice,
  disabled,
  type = "text",
  register,
  errors,
  minLength,
}) => {
  return (
    <Fragment>
      <div className="w-full relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className="text-neutral-700 absolute top-5 left-2"
          />
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required: true, minLength: minLength })}
          placeholder=" "
          type={type}
          className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed shadow-sm focus:shadow-md
        ${formatPrice ? `pl-9` : `pl-4`}
        ${errors[id] ? `border-rose-500` : `border-neutral-300`}
        ${errors[id] ? `focus:border-rose-500` : `focus:border-black`}
        `}
          required={required}
        />
        <label
          className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
            formatPrice ? `left-9` : `left-4`
          } 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? `text-rose-500` : `text-zinc-400`}
        `}
        >
          {label}
        </label>
      </div>
      {type === "password" && errors[id] && (
        <div className="opacity-50 text-sm mt-[-1rem]">
          The password should be atleast 6 characters long
        </div>
      )}
    </Fragment>
  );
};

export default Input;
