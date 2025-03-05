import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./Input";
import { MdMail } from "react-icons/md";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setEmail } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/hooks";
import { toast } from "react-toastify";

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase character" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase character" }),
});

export type loginType = z.infer<typeof loginSchema>;
export default function AdminLoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = loginAdmin();

  const onSubmit: SubmitHandler<loginType> = (data: loginType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Logged in successfully", {
          autoClose: 2000,
        });
        dispatch(setEmail(data.email));
        navigate("/admin/dashboard", { replace: true });
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full max-w-[320px] flex flex-col gap-6 justify-center mx-auto p-4"
    >
      <h1 className="text-center text-xl font-bold">
        E<span className="text-brandBlue text-2xl">-Exam</span>
      </h1>
      {/* Email Field */}
      <InputField
        htmlFor="email"
        type="email"
        icon={<MdMail size={20} color="#3385ff" />}
        label="Email"
        placeholder="Enter your email address"
        error={errors.email}
        {...register("email")}
      />

      {/* Password Field */}
      <PasswordInput
        htmlFor="password"
        type={isPasswordVisible ? "text" : "password"}
        icon={<FaLock size={17} color="#3385ff" />}
        icon2={
          isPasswordVisible ? (
            <FaRegEyeSlash size={17} color="#3385ff" />
          ) : (
            <FaRegEye size={17} color="#3385ff" />
          )
        }
        label="Password"
        placeholder="Enter your password"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        error={errors.password}
        {...register("password")}
      />

      {/* Submit Button */}
      <Button type="submit">
        {isPending ? <p>Logging in...</p> : <p>Login</p>}
      </Button>
    </form>
  );
}
