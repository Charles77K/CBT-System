import React from "react";

interface ISelectInput<T> {
  options: T[];
  label: string;
  isDisabled?: boolean;
  optionValue: (option: T) => string | number;
  optionMain: (option: T) => string;
  multiple?: boolean;
  style?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const SelectInput = React.forwardRef<
  HTMLInputElement,
  ISelectInput<any> & {
    onChange: (value: string | number) => void;
    value: string | number;
  }
>(
  (
    {
      options = [],
      value,
      onChange,
      label,
      isDisabled = false,
      optionValue,
      optionMain,
      multiple = false,
      style,
      isLoading = false,
      isError = false,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div>
        <label className="block text-sm font-semibold my-1">{label}</label>
        <select
          className={
            style
              ? style
              : "block w-full md:w-1/2 bg-gray-100 border border-gray-300 rounded-md"
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          multiple={multiple}
          disabled={isDisabled}
        >
          <option value="">Select an option</option>

          {isLoading && <option>Loading exams...</option>}
          {isError && <option>Error fetching exams</option>}
          {options.map((option, index) => (
            <option key={index} value={optionValue(option)}>
              {optionMain(option) || `No ${label} found`}
            </option>
          ))}
          {options?.length === 0 && <option>No exams available</option>}
        </select>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

export default SelectInput;
