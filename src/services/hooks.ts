import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { fetchData, postData } from "./http";
import { ICandidate, IExam } from "./types";
import { loginType } from "../components/AdminLoginForm";
import { CandidateType } from "../components/candidate/SignUp";

export const loginAdmin = () => {
  return useMutation({
    mutationFn: (data: loginType) => postData("admin/login", data),
    onError: (err) => {
      console.log("An error occurred:", err);
      toast.error("Invalid username or password", {
        autoClose: 2000,
      });
    },
  });
};

//create a new candidate
export const useCreateCandidate = (reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postData("/candidates/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
      toast.success("candidate created successfully", {
        autoClose: 2000,
      });
      reset();
    },
    onError: (err) => {
      console.log("An error occurred:", err);
    },
  });
};

//fetch all available exams
export const useFetchExams = () => {
  return useQuery<IExam[], Error>({
    queryKey: ["exams"],
    queryFn: ({ signal }) => fetchData("exam", { signal }),
  });
};

//fetch all available candidates
export const useFetchCandidates = (exam: string) =>
  useQuery<ICandidate[], Error>({
    queryKey: ["candidates", exam],
    queryFn: ({ signal }) =>
      fetchData(exam === "All" ? "/candidates" : `/candidates/${exam}/`, {
        signal,
      }),
    enabled: !!exam,
  });

export const useCreateExam = (reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postData("exam", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });
      toast.success("Exams successfully created", {
        autoClose: 2000,
      });
      reset();
    },
    onError: (err) => {
      toast.error("An error occurred while creating exam");
      console.log("Something went wrong:", err);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: CandidateType) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(postData("candidates/register", data)), 1000)
      ),
    onError: (err) => {
      toast.error("An error occurred while signing up");
      console.log("Something went wrong:", err);
    },
  });
};
