import React from "react";
import InputField from "../Input";
// import { } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../SelectInput";
import { useFetchExams, useSignUp } from "../../services/hooks";
import { ICandidate, IExam } from "../../services/types";
import Button from "../Button";
import Spinner from "../../ui/Spinner";
import ExamCode, { IExamCodeHandle } from "../../ui/ExamCode";

const candidateSchema = z.object({
  firstname: z
    .string()
    .min(2, "firstname should have a minimum of 2 characters")
    .max(50),
  lastname: z
    .string()
    .min(2, "lastname should have a minimum of 2 characters")
    .max(50),
  email: z.string().email("invalid email address"),
  examCode: z.string().optional(),
  phone: z.string().min(10).max(15),
  exam: z.string(),
});

export type CandidateType = z.infer<typeof candidateSchema>;

const SignUp = () => {
  const modalRef = React.useRef<IExamCodeHandle>(null);
  const { data, isPending, isError } = useFetchExams();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CandidateType>({
    resolver: zodResolver(candidateSchema),
    mode: "onBlur",
  });

  const { mutate, isPending: isLoading } = useSignUp();

  const onSubmit = (data: CandidateType) => {
    mutate(data, {
      onSuccess: (candidateData) => {
        modalRef.current?.open();
        console.log("Candidate data:", candidateData);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Candidate Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            htmlFor="firstname"
            label="Firstname"
            type="text"
            {...register("firstname")}
            error={errors.firstname?.message}
          />

          <InputField
            htmlFor="lastname"
            label="Lastname"
            type="text"
            {...register("lastname")}
            error={errors.lastname?.message}
          />

          <InputField
            htmlFor="email"
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputField
            htmlFor="phone"
            label="Phone"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Controller
            name="exam"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Select an Exam"
                options={data ?? []}
                value={value}
                onChange={onChange}
                isError={isError}
                optionValue={(exam: IExam) => exam._id}
                optionMain={(exam: IExam) => exam.name}
                isLoading={isPending}
                errorMessage={errors.exam?.message}
              />
            )}
          />

          <div className="pt-4">
            <Button
              disabled={isLoading}
              className="disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner size="sm" /> : <p>Submit</p>}
            </Button>
          </div>
        </form>
        <button onClick={() => modalRef.current?.open()}>SHow ref</button>
      </div>
      <ExamCode examCode="568816" ref={modalRef} />
    </div>
  );
};

export default SignUp;
