import { ReactNode, ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className, ...props }: IButton) => {
  return (
    <button
      className={`w-full p-2 bg-brandBlue text-white rounded-md hover:bg-blue-800 cursor-pointer transition-all ease-in-out duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
