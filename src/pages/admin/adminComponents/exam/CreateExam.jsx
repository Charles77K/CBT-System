import { useForm } from "react-hook-form";
import InputField from "../../../../components/Input";
import { FaClock, FaUser } from "react-icons/fa";
import Button from "../../../../components/Button";
import TextArea from "./../../../../components/TextArea";
import { useMutation } from "@tanstack/react-query";
import { postData, queryClient } from "./../../../../services/http";
import { toast } from "react-toastify";

export default function CreateExam() {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const durationToISO = (duration) => {
		const [hours, minutes, seconds] = duration.split(":").map(Number);
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (data) => postData("/exams/", data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["exams"],
			});
			toast.success("Exams successfully created", 2000);
			reset();
		},
		onError: (err) => {
			toast.error("An error occurred while creating exam");
			console.log("Something went wrong:", err);
		},
	});

	const onSubmit = (data) => {
		const formattedData = {
			...data,
			duration: durationToISO(data.duration),
		};
		mutate(formattedData);
		console.log(formattedData);
	};
	return (
		<div>
			<h2 className="text-sm md:text:lg font-semibold my-2">Create Exam</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<InputField
						htmlFor="name"
						label="Name"
						{...register("name", {
							required: "name is required",
							maxLength: {
								value: 50,
								message: "Name must not be more than 50 characters",
							},
						})}
						icon={<FaUser />}
						type="text"
						error={errors.name?.message}
					/>
					<InputField
						htmlFor="duration"
						label="Duration"
						{...register("duration", {
							required: "Duration is required",
							pattern: {
								value: /^\d{2}:\d{2}:\d{2}$/,
								message: "Duration must be in HH:mm:ss format (e.g., 01:30:00)",
							},
						})}
						icon={<FaClock />}
						type="text"
						placeholder="e.g., 01:30:00"
						error={errors.duration?.message}
					/>
				</div>
				<TextArea
					label="Description"
					name="description"
					{...register("description", {
						required: "description is required",
					})}
					rows="3"
					error={errors.duration?.message}
				/>
				<Button>
					<p>{isPending ? "Submitting.." : "Submit"}</p>
				</Button>
			</form>
		</div>
	);
}
