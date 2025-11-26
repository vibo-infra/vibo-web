import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholderBg?: string;
  secret?: boolean;
}

const Input: React.FC<InputProps> = ({ label, className = "", secret, placeholderBg, ...props }) => {

  const [show, setShow] = useState(false);

  if (secret) {
    props.type = show ? "text" : "password";
  }

  return (
    <div className="relative w-full font-medium">
      <input
        {...props}
        placeholder=" "
        className={`
          peer block w-full 
          px-4 py-3 pt-5 pl-5
          bg-background-tertiary-light
          border border-text-secondary
          rounded-3xl
          focus:ring-2 focus:ring-[--color-primary]/20
          focus:outline-none
          transition-all duration-200 ease-out
          text-md
          ${className}
        `}
      />
      {secret && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
        >
          {show ? (
            <IoEyeOff style={{ width: "24px", height: "24px" }} />
          ) : (
            <IoEye style={{ width: "24px", height: "24px" }} />
          )}
        </button>
      )}

      <label
        className={`
          absolute left-4 top-1/2 -translate-y-1/2 
          text-text-muted
          text-md
          pointer-events-none 
          transition-all duration-300 ease-out

          /* Float Up */
          peer-focus:top-1 
          peer-focus:text-xs 
          peer-focus:text-[--color-primary]
          rounded-4xl
          px-1

          /* When text is typed */
          peer-[:not(:placeholder-shown)]:top-1
          peer-[:not(:placeholder-shown)]:text-xs
          peer-[:not(:placeholder-shown)]:text-[--color-text-secondary]
        ${placeholderBg ? `bg-${placeholderBg}` : 'bg-background-tertiary-light'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
