import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldError, FieldErrors } from "react-hook-form";

interface IPasswordInput extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  icon: React.ReactElement;
  icon2: React.ReactElement;
  type?: HTMLInputTypeAttribute;
  onClick: () => void;
  error?: string | FieldError | FieldErrors;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInput>(
  ({ htmlFor, label, icon, type, icon2, onClick, error, ...props }, ref) => {
    const errorMessage =
      typeof error === "string"
        ? error
        : error && "message" in error
        ? error.message
        : undefined;
    return (
      <div className="text-sm flex flex-col gap-1">
        <label htmlFor={htmlFor}>{label}</label>
        <div className="flex gap-1 border-2 border-gray-200 p-2 rounded-md">
          {icon}
          <input
            className="text-xs flex-1 bg-transparent outline-none"
            type={type || "text"}
            {...props}
            ref={ref}
            required
          />
          <div onClick={onClick} className="cursor-pointer">
            {icon2}
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs">{errorMessage?.toString()}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
