import { forwardRef, ReactNode, InputHTMLAttributes } from "react";
import { FieldError, FieldErrors } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  icon?: ReactNode;
  error?: string | FieldError | FieldErrors; // ✅ Now supports nested errors
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { htmlFor, label, icon, type = "text", error, className, ...props },
    ref
  ) => {
    // Extract error message safely
    const errorMessage =
      typeof error === "string"
        ? error
        : error && "message" in error
        ? error.message
        : undefined;

    return (
      <div className="text-sm flex flex-col gap-1">
        <label htmlFor={htmlFor} className="text-xs md:text-sm">
          {label}
        </label>
        <div className="flex gap-1 border-2 border-gray-200 p-2 rounded-md">
          {icon}
          <input
            className={
              className
                ? className
                : `text-xs flex-1 bg-transparent outline-none`
            }
            type={type}
            {...props}
            ref={ref}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-xs">{errorMessage.toString()}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
