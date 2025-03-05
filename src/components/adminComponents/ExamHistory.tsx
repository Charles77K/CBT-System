const TABLE_DATA = [
	{
		title: "Mathematics",
		class: "Grade 10",
		code: "MTH101",
		participants: 23,
		submitted: 23,
		schedule: "14 macrch 2024",
		status: "Ongoing",
	},
	{
		title: "Biology",
		class: "Grade 11",
		code: "BIO110",
		participants: 25,
		submitted: 20,
		schedule: "12 october 2025",
		status: "Scheduled",
	},
	{
		title: "Chemistry",
		class: "Grade 12",
		code: "CHEM120",
		participants: 20,
		submitted: 18,
		schedule: "17 june 2024",
		status: "Completed",
	},
	{
		title: "Physics",
		class: "Grade 10",
		code: "PHY102",
		participants: 18,
		submitted: 17,
		schedule: "19 june 2025",
		status: "Ongoing",
	},
	{
		title: "History",
		class: "Grade 9",
		code: "HIS090",
		participants: 15,
		submitted: 10,
		schedule: "25 dec. 2024",
		status: "Cancelled",
	},
];

export default function ExamHistory() {
	return (
		<div className="border-2 border-gray-200 rounded-md overflow-hidden">
			<table className="w-full text-sm text-left">
				<thead className="bg-gray-100 text-gray-700 text-xs">
					<tr>
						<th className="px-4 py-3">Title</th>
						<th className="px-4 py-2">Class</th>
						<th className="px-4 py-2">Code</th>
						<th className="px-4 py-2">Participants</th>
						<th className="px-4 py-2">Submit</th>
						<th className="px-4 py-2">Schedule</th>
						<th className="px-4 py-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{TABLE_DATA.map((item, index) => (
						<tr key={index} className={`border-b text-xs`}>
							<td className="px-4 py-5">{item.title}</td>
							<td className="px-4 py-5">{item.class}</td>
							<td className="px-4 py-5">{item.code}</td>
							<td className="px-4 py-5">{item.participants}</td>
							<td className="px-4 py-5">{`${item.submitted}/${item.participants}`}</td>
							<td className="px-4 py-5">{item.schedule}</td>
							<td
								className={`px-4 py-5 font-semibold ${
									item.status === "Ongoing"
										? "text-blue-600"
										: item.status === "Scheduled"
										? "text-green-600"
										: item.status === "Completed"
										? "text-gray-500"
										: "text-red-600"
								}`}
							>
								{item.status}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
