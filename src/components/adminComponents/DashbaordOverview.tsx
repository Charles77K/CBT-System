import Overviews from "./Overviews";
import { MdPeopleAlt } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";
const DUMMY_DATA = [
	{
		icon: <MdPeopleAlt size={15} color="blue" />,
		title: "Students at the exam",
		number: "432",
	},
	{
		icon: <IoFlag size={15} color="blue" />,
		title: "Exam Finishes",
		number: "12",
	},
	{
		icon: <FaFileUpload size={15} color="blue" />,
		title: "Running Exams",
		number: "12",
	},
	{
		icon: <FaFileCircleCheck size={15} color="blue" />,
		title: "Completed Rate",
		number: "86%",
	},
];
export default function DashbaordOverview() {
	return (
		<div>
			<p className="font-semibold mb-1.5">Dashboard</p>
			<p>Overview of your exams, studentsand other resources</p>
			<div className="my-2 grid md:grid-cols-4 grid-cols-2 gap-5">
				{DUMMY_DATA.map((item, index) => (
					<Overviews
						key={index}
						icon={item.icon}
						number={item.number}
						title={item.title}
					/>
				))}
			</div>
		</div>
	);
}
