import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { fetchData, postData } from "./http";

//create a new candidate
export const useCreateCandidate = (reset) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
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
	return { mutate, isPending };
};

//fetch all available exams
export const useFetchExams = () => {
	const { data, isPending, isError } = useQuery({
		queryKey: ["exams"],
		queryFn: ({ signal }) => fetchData("/exams", { signal }),
	});
	return { examData: data, isExamLoading: isPending, isExamError: isError };
};

//fetch all available candidates
export const useFetchCandidates = (exam) => {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["candidates", exam],
		queryFn: ({ signal }) =>
			fetchData(exam === "All" ? "/candidates" : `/candidates/${exam}/`, {
				signal,
			}),
		enabled: !!exam,
	});
	return {
		candidateData: data,
		isCandidatesLoading: isLoading,
		isCandidatesError: isError,
		refetch,
	};
};
