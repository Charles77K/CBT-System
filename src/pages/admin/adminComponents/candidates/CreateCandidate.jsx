import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import {
	useCreateCandidate,
	useFetchExams,
} from "../../../../services/Tanstack";
import InputField from "../../../../components/Input";
import Button from "../../../../components/Button";

export default function CreateCandidate() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm();

	const { examData, isExamError, isExamLoading } = useFetchExams();
	const { mutate, isPending } = useCreateCandidate(reset);

	const selectedExams = watch("exams") || [];

	const onSubmit = (data) => {
		mutate(data);
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
			<h2 className="my-2 font-semibold text-sm md:text-lg">
				Create a Candidate
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
				{/* First Name */}
				<InputField
					htmlFor="firstname"
					label="First Name"
					icon={<FaUser />}
					{...register("firstname", {
						required: "First name is required",
						maxLength: {
							value: 200,
							message: "First name cannot exceed 200 characters",
						},
					})}
					error={errors.firstname?.message}
				/>

				{/* Last Name */}
				<InputField
					htmlFor="lastname"
					label="Last Name"
					icon={<FaUser />}
					{...register("lastname", {
						required: "Last name is required",
						maxLength: {
							value: 200,
							message: "Last name cannot exceed 200 characters",
						},
					})}
					error={errors.lastname?.message}
				/>

				{/* Email */}
				<InputField
					htmlFor="email"
					label="Email"
					icon={<FaEnvelope />}
					type="email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Invalid email address",
						},
						maxLength: {
							value: 200,
							message: "Email cannot exceed 200 characters",
						},
					})}
					error={errors.email?.message}
				/>

				{/* Phone */}
				<InputField
					htmlFor="phone"
					label="Phone"
					icon={<FaPhone />}
					type="tel"
					{...register("phone", {
						maxLength: {
							value: 15,
							message: "Phone number cannot exceed 15 characters",
						},
						pattern: {
							value: /^[0-9]+$/,
							message: "Phone must contain only digits",
						},
					})}
					error={errors.phone?.message}
				/>

				{/* Exam Code (auto-generated, disabled for user) */}
				<InputField
					htmlFor="examcode"
					label="Exam Code"
					icon={<FaUser />}
					type="text"
					{...register("examcode", {
						required: true, // Just for React Hook Form validation logic
					})}
					error={errors.examcode?.message}
					// disabled
				/>
			</div>
			{/* Exam list */}
			<div className="mt-4">
				<h2 className="text-xs md:text-sm font-semibold">Select Exams:</h2>
				{isExamLoading && <p>Loading exams...</p>}
				{isExamError && (
					<p className="text-sm text-red-700">Error Loading exams</p>
				)}
				{examData && examData.length > 0 && (
					<div className="flex gap-3">
						{examData.map((exam, index) => (
							<label key={index} className="flex items-center space-x-2">
								<input
									type="checkbox"
									value={exam.id}
									checked={selectedExams.includes(exam.id)} // Controlled component
									onChange={(e) => {
										const newSelectedExams = e.target.checked
											? [...selectedExams, exam.id]
											: selectedExams.filter((id) => id !== exam.id);
										setValue("exams", newSelectedExams); // Update form state
									}}
								/>
								<span className="text-xs md:text-sm">{exam.name}</span>
							</label>
						))}
					</div>
				)}

				{examData && !examData.length > 0 && <p>No exams found</p>}
			</div>

			{/* Submit Button */}
			<Button className="w-1/4 mt-4 md:text-sm text-xs bg-brandBlue text-white p-2 rounded-lg hover:bg-blue-600">
				<p>{isPending ? "Registering..." : "Register"}</p>
			</Button>
		</form>
	);
}
