import { useEffect, useRef, useState } from "react";
import {
	useFetchCandidates,
	useFetchExams,
} from "../../../../services/Tanstack";
import { FaPen, FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import LogoutModal from "../../../../ui/LogoutModal";
import { deleteData, putData, queryClient } from "../../../../services/http";
import { toast } from "react-toastify";
import CandidateSkeleton from "./CandidateSkeleton";

export default function ViewCandidates() {
	const [selectedExam, setSelectedExam] = useState("All");
	const [showModal, setShowModal] = useState(false);
	const candidateId = useRef(null);
	const [editingCandidate, setEditingCandidate] = useState(null);
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		exams: [],
	});

	// Fetch candidates and exams
	const { candidateData, isCandidatesError, isCandidatesLoading, refetch } =
		useFetchCandidates(selectedExam);
	const { examData, isExamError, isExamLoading } = useFetchExams();

	const handleExamChange = (event) => setSelectedExam(event.target.value);

	// Update candidate
	const { mutate: updateCandidate, isPending: isUpdatePending } = useMutation({
		mutationFn: ({ data, id }) => putData(`/candidate/${id}/`, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["candidates"] });
			toast.success("Candidate updated successfully", { autoClose: 2000 });
			setEditingCandidate(null);
		},
	});

	const handleEditClick = (candidate) => {
		setEditingCandidate(candidate.id);
		setFormData({
			firstname: candidate.firstname,
			lastname: candidate.lastname,
			email: candidate.email,
			phone: candidate.phone,
			exams: candidate.exams,
		});
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		updateCandidate({ data: formData, id: editingCandidate });
	};

	// Delete candidate
	const { mutate: deleteCandidate, isPending: isDeletePending } = useMutation({
		mutationFn: (id) => deleteData(`/candidate/${id}/`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["candidates"] });
			toast.success("Candidate deleted successfully", { autoClose: 2000 });
			setShowModal(false);
		},
	});

	const handleDeleteClick = (id) => {
		candidateId.current = id;
		setShowModal(true);
	};

	useEffect(() => {
		refetch();
	}, [selectedExam, refetch]);

	return (
		<main>
			<h2 className="my-2 font-semibold text-lg">View All Candidates</h2>
			{/* Exam Filter */}
			<div className="mb-4">
				<label htmlFor="examFilter" className="block mb-1 text-xs font-medium">
					Filter by Exam:
				</label>
				<select
					id="examFilter"
					className="border border-gray-300 rounded-lg p-1.5 text-xs md:text-sm w-1/4"
					value={selectedExam}
					onChange={handleExamChange}
					disabled={isExamLoading || isExamError}
				>
					<option value="All">All Exams</option>
					{isExamLoading && <option>Loading exams...</option>}
					{isExamError && <option>Error fetching exams</option>}
					{examData?.map((exam) => (
						<option key={exam.id} value={exam.id}>
							{exam.name}
						</option>
					))}
					{examData?.length === 0 && <option>No exams available</option>}
				</select>
			</div>

			{/* Candidates Table */}
			<div className="border-gray-200 text-xs md:text-sm rounded-md border-2 w-full">
				{isCandidatesLoading && (
					<div className="text-center p-4">
						<CandidateSkeleton columns={6} rows={5} />
					</div>
				)}
				{isCandidatesError && (
					<p className="text-center text-red-500 p-4">
						Failed to load candidates.
					</p>
				)}
				{!isCandidatesLoading && !isCandidatesError && (
					<>
						{candidateData && candidateData.length > 0 ? (
							<table className="w-full text-sm text-left">
								<thead className="bg-gray-100 text-gray-700 text-xs">
									<tr>
										<th className="px-4 py-2">Last name</th>
										<th className="px-4 py-2">First name</th>
										<th className="px-4 py-2">Email</th>
										<th className="px-4 py-2">Phone</th>
										<th className="px-4 py-2">Reg_date</th>
										<th className="px-4 py-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{candidateData.map((candidate) => (
										<tr key={candidate.id} className="border-b text-xs">
											<td className="px-4 py-5">
												{editingCandidate === candidate.id ? (
													<input
														type="text"
														value={formData.lastname}
														onChange={(e) =>
															setFormData({
																...formData,
																lastname: e.target.value,
															})
														}
														className="border px-2 py-1 rounded-md"
													/>
												) : (
													candidate.lastname
												)}
											</td>
											<td className="px-4 py-5">
												{editingCandidate === candidate.id ? (
													<input
														type="text"
														value={formData.firstname}
														onChange={(e) =>
															setFormData({
																...formData,
																firstname: e.target.value,
															})
														}
														className="border px-2 py-1 rounded-md"
													/>
												) : (
													candidate.firstname
												)}
											</td>
											<td className="px-4 py-5">
												{editingCandidate === candidate.id ? (
													<input
														type="text"
														value={formData.email}
														onChange={(e) =>
															setFormData({
																...formData,
																email: e.target.value,
															})
														}
														className="border px-2 py-1 rounded-md"
													/>
												) : (
													candidate.email
												)}
											</td>
											<td className="px-4 py-5">
												{editingCandidate === candidate.id ? (
													<input
														type="text"
														value={formData.phone}
														onChange={(e) =>
															setFormData({
																...formData,
																phone: e.target.value,
															})
														}
														className="border px-2 py-1 rounded-md"
													/>
												) : (
													candidate.phone
												)}
											</td>
											<td className="px-4 py-5">
												{new Date(
													candidate.registration_date
												).toLocaleDateString("en-us", {
													day: "2-digit",
													month: "short",
													year: "2-digit",
												})}
											</td>
											<td className="px-4 py-5 flex space-x-2">
												{editingCandidate === candidate.id ? (
													<>
														<button
															onClick={handleFormSubmit}
															className="text-blue-500"
															disabled={isUpdatePending}
														>
															{isUpdatePending ? "Saving..." : "Save"}
														</button>
														<button
															onClick={() => setEditingCandidate(null)}
															className="text-red-500"
														>
															Cancel
														</button>
													</>
												) : (
													<>
														<FaPen
															onClick={() => handleEditClick(candidate)}
															className="text-yellow-500 cursor-pointer"
														/>
														<FaTrash
															onClick={() => handleDeleteClick(candidate.id)}
															className="text-red-500 cursor-pointer"
														/>
													</>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p className="text-center p-4">No candidates found.</p>
						)}
					</>
				)}
			</div>

			{/* Delete Confirmation Modal */}
			{showModal && (
				<LogoutModal
					noText="No"
					onCancel={() => setShowModal(false)}
					onNo={() => setShowModal(false)}
					onYes={() => deleteCandidate(candidateId.current)}
					title="Are you sure you want to delete?"
					yesText={isDeletePending ? "Deleting..." : "Yes"}
				/>
			)}
		</main>
	);
}
