import { useEffect, useRef, useState } from "react";
import { useFetchCandidates, useFetchExams } from "../../../services/hooks";
import { FaPen, FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import LogoutModal from "../../../ui/LogoutModal";
import { deleteData, putData, queryClient } from "../../../services/http";
import { toast } from "react-toastify";
import CandidateSkeleton from "./CandidateSkeleton";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

// Define proper interfaces
interface ICandidate {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  exams: string[];
}

interface ICandidateWithId extends ICandidate {
  id: string;
  registration_date: string;
}

// Define types for our custom hooks
interface UseFetchCandidatesResult {
  candidateData: ICandidateWithId[] | undefined;
  isCandidatesLoading: boolean;
  isCandidatesError: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ICandidateWithId[], Error>>;
}

// Type assertion function to safely convert the hook results
function assertUseFetchCandidates(result: any): UseFetchCandidatesResult {
  return result as UseFetchCandidatesResult;
}

export default function ViewCandidates() {
  const [selectedExam, setSelectedExam] = useState<string>("All");
  const [showModal, setShowModal] = useState<boolean>(false);
  const candidateId = useRef<string | null>(null);
  const [editingCandidate, setEditingCandidate] = useState<string | null>(null);
  const [formData, setFormData] = useState<ICandidate>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    exams: [],
  });

  // Use our safe assertion functions
  const {
    candidateData = [], // Provide default empty array
    isCandidatesError,
    isCandidatesLoading,
    refetch,
  } = assertUseFetchCandidates(useFetchCandidates(selectedExam));

  const handleExamChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedExam(event.target.value);

  // Update candidate with proper typing
  const { mutate: updateCandidate, isPending: isUpdatePending } = useMutation({
    mutationFn: ({ data, id }: { data: ICandidate; id: string | null }) =>
      putData(`/candidate/${id}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate updated successfully", { autoClose: 2000 });
      setEditingCandidate(null);
    },
  });

  const handleEditClick = (candidate: ICandidateWithId) => {
    setEditingCandidate(candidate.id);
    setFormData({
      firstname: candidate.firstname,
      lastname: candidate.lastname,
      email: candidate.email,
      phone: candidate.phone,
      exams: candidate.exams,
    });
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateCandidate({ data: formData, id: editingCandidate });
  };

  // Delete candidate with proper typing
  const { mutate: deleteCandidate, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => deleteData(`/candidate/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate deleted successfully", { autoClose: 2000 });
      setShowModal(false);
    },
  });

  const {
    data: examData,
    isPending: isExamLoading,
    isError: isExamError,
  } = useFetchExams();

  console.log(examData);

  const handleDeleteClick = (id: string) => {
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
          {examData &&
            examData.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.name}
              </option>
            ))}
          {examData && examData.length === 0 && (
            <option>No exams available</option>
          )}
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
            {candidateData.length > 0 ? (
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
          onYes={() =>
            candidateId.current && deleteCandidate(candidateId.current)
          }
          title="Are you sure you want to delete?"
          yesText={isDeletePending ? "Deleting..." : "Yes"}
        />
      )}
    </main>
  );
}
