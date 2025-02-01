import { useForm } from "react-hook-form";
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

const envEmail = "charlesobiora16@gmail.com";
const envPass = "Charles";

export default function AdminLoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
	});

	const onSubmit = (data) => {
		setIsLoading(true);
		if (data.email === envEmail && data.password === envPass) {
			dispatch(setEmail(data.email));
			console.log("login successful");
			navigate("/admin/dashboard", { replace: true });
			setIsLoading(false);
		} else {
			console.log("Incorrect email or password");
		}
		setIsLoading(false);
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
				error={errors.email?.message}
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
				error={errors.password?.message}
				{...register("password")}
			/>

			{/* Submit Button */}
			<Button type="submit">
				{isLoading ? <p>Logging in...</p> : <p>Login</p>}
			</Button>
		</form>
	);
}
