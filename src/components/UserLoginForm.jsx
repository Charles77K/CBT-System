import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { setUserEmail } from "../store/userAuth";
import { useNavigate } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import PasswordInput from "./PasswordInput";
import InputField from "./Input";
import Button from "./Button";

// Zod schema for form validation
const loginSchema = z.object({
	email: z
		.string()
		.nonempty({ message: "Email is required" })
		.email({ message: "Please enter a valid email address" }),
	passcode: z.string(),
});

const envEmail = "ogbe@gmail.com";
const envPass = "ogbe";

export default function UserLoginForm() {
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
		if (data.email === envEmail && data.passcode === envPass) {
			dispatch(setUserEmail(data.email));
			toast.success("login successful");
			setIsLoading(false);
			navigate("/", { replace: true });
		} else {
			toast.error("Incorrect email or password");
		}
		setIsLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full h-full max-w-[320px] flex flex-col gap-6 justify-center mx-auto p-4 bg-stone-300 border-solid border-black"
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
				htmlFor="passcode"
				type={isPasswordVisible ? "text" : "password"}
				icon={<FaLock size={17} color="#3385ff" />}
				icon2={
					isPasswordVisible ? (
						<FaRegEyeSlash size={17} color="#3385ff" />
					) : (
						<FaRegEye size={17} color="#3385ff" />
					)
				}
				label="Passcode"
				placeholder="Enter your passcode"
				onClick={() => setIsPasswordVisible((prev) => !prev)}
				error={errors.passcode?.message}
				{...register("passcode")}
			/>

			{/* Submit Button */}
			<Button type="submit">
				{isLoading ? <p>logging in</p> : <p>Login</p>}
			</Button>
		</form>
	);
}
