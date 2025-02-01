import DashbaordOverview from "./adminComponents/DashbaordOverview";
import ExamHistory from "./adminComponents/ExamHistory";

export default function Dashboard() {
	return (
		<div className="text-sm">
			{/* dashboard overview */}
			<div>
				<DashbaordOverview />
			</div>
			<div>
				<p className="font-semibold">Exam History</p>
				<p className="text-xs font-light my-1.5">
					View all previous exams and the participants
				</p>
				<ExamHistory />
			</div>
		</div>
	);
}