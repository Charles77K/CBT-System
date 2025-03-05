import { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError, FieldErrors } from "react-hook-form";

interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  error?: string | FieldError | FieldErrors;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ name, label, rows = 3, error, ...props }, ref) => {
    const errorMessage =
      typeof error === "string"
        ? error
        : error && "message" in error
        ? error.message
        : undefined;

    return (
      <div className="mb-4">
        <label htmlFor={name} className="text-xs md:text-sm">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          ref={ref}
          rows={rows}
          {...props}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        />
        {errorMessage && (
          <p className="text-red-500 text-xs">{errorMessage.toString()}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
