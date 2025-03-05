import { useState } from "react";
import SelectInput from "../../components/SelectInput";
import ReactQuill from "react-quill";
import { useFetchExams } from "../../services/hooks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { queryClient, postData } from "../../services/http";

type OptionPayload = {
  questionId: string;
  options: any[]; // Replace `any` with the actual option type if possible
};

const initialForm = {
  exam: "",
  text: "",
  options: [
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ],
};

type QuestionPayload = {
  data: {
    exam: string;
    text: string;
  };
  id: string;
};
export default function CreateQuestion() {
  const { examData, isExamError, isExamLoading } = useFetchExams();
  const [examId, setExamId] = useState<string>("");
  const [selectedInput, setSelectedInput] =
    useState<typeof initialForm>(initialForm);

  const resetForm = () => {
    setSelectedInput(initialForm);
    setExamId("");
  };

  //mutaton function to create a question
  const { mutate, isPending } = useMutation<void, Error, QuestionPayload>({
    mutationFn: ({ data, id }) => {
      return Promise.resolve(postData(`/questions/${id}/`, data));
    },
    onSuccess: (response: any) => {
      console.log(response);
      const createdQuestionId = response?.question.id || response?.data.id;
      if (createdQuestionId) {
        createOptionsForQuestion(createdQuestionId);
        queryClient.invalidateQueries({
          queryKey: ["questions", examId],
        });
      } else {
        console.error("No Id found in the response", response);
      }
    },
    onError: (err) => {
      console.log("An error occurred" + err);
    },
  });

  //mutate function to create options
  const { mutate: createOptions } = useMutation<void, Error, OptionPayload>({
    mutationFn: async ({ questionId, options }) => {
      await Promise.all(
        options.map((option) => postData(`/options/${questionId}/`, option))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["options"],
      });
      toast.success("Question successfully created", {
        autoClose: 2000,
      });
      resetForm();
    },
    onError: (err) => {
      console.log("An error occurred while creating options: " + err);
    },
  });

  const createOptionsForQuestion = (questionId: string) => {
    const optionsData = selectedInput.options.map((option) => ({
      text: option.text,
      is_correct: option.is_correct,
    }));
    createOptions({ questionId, options: optionsData });
  };

  const handleSelectExam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setExamId(value);
  };

  const handleChangeOption = (index: number, value: string) => {
    const updatedOptions = [...selectedInput.options];
    updatedOptions[index].text = value;
    setSelectedInput({ ...selectedInput, options: updatedOptions });
  };

  const handleCheckBox = (index: number) => {
    const updatedOptions = selectedInput.options.map((option, i) => ({
      ...option,
      is_correct: i === index ? !option.is_correct : false,
    }));
    setSelectedInput({ ...selectedInput, options: updatedOptions });
  };

  const handleAddOption = () => {
    setSelectedInput((prevState) => ({
      ...prevState,
      options: [...prevState.options, { text: "", is_correct: false }],
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    mutate({
      data: {
        exam: selectedInput.exam,
        text: selectedInput.text,
      },
      id: examId,
    });
  };

  return (
    <div className="min-h-screen">
      <SelectInput
        label="Topics Covered"
        name="exam"
        onChange={handleSelectExam}
        value={selectedInput.exam}
        optionMain={(option) => option.name}
        options={examData}
        isError={isExamError}
        isLoading={isExamLoading}
        optionValue={(option) => option.id}
        style={
          "w-1/2 md:w-1/4 bg-gray-100 p-2 text-xs rounded-md border border-gray-200"
        }
      />
      {/* Quesrion */}
      <div className="mt-3">
        <label className="text-sm font-bold">Question</label>
        <ReactQuill
          theme="snow"
          value={selectedInput.text}
          onChange={(value) =>
            setSelectedInput({ ...selectedInput, text: value })
          }
          className="h-36 rounded-md"
          placeholder="Enter an answer"
        />
      </div>
      {/* Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-20 sm:mt-14 gap-[6rem] sm:gap-[3.5rem]">
        {selectedInput.options.map((option, index) => (
          <div key={index}>
            <div className="flex gap-5 my-1">
              <label className="text-xs md:text-sm font-bold">
                Option {index + 1}
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={option.is_correct}
                  onChange={() => handleCheckBox(index)}
                />
                <span className="ml-2 text-xs md:text-sm">Mark as correct</span>
              </div>
            </div>
            <div className="flex flex-col gap-5 md:gap-1">
              <div>
                <ReactQuill
                  theme="snow"
                  value={option.text}
                  onChange={(value) => handleChangeOption(index, value)}
                  placeholder={`Enter Choice ${index + 1}`}
                  className="h-14 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add Option Button */}
      <button
        type="button"
        onClick={handleAddOption}
        className="bg-green-500 text-white p-1 text-xs mt-24 sm:mt-16 rounded-md"
      >
        + Add Option
      </button>
      <div className="flex justify-end">
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-brandBlue text-white py-3 text-xs md:text-sm hover:bg-blue-700 transition-hover ease-in-out duration-200 mt-5 rounded-md w-1/5"
        >
          {isPending ? "Creating..." : "Create Question"}
        </button>
      </div>
    </div>
  );
}
