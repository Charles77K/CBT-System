import { useSelector } from "react-redux";

export default function StartExam() {
	const userEmail = useSelector((state) => state.userAuth.email);
	return (
		<main className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full">
			<div>
				<h1 className="text-lg font-bold">
					E<span className="text-brandBlue text-xl">-Exam</span>
				</h1>
				<p className="mb-1 text-xs md:text-sm">
					Hello, <span className="font-semibold">{userEmail}</span>{" "}
					<span>Welocome to your aptitude test</span>{" "}
				</p>
			</div>
			{/* instructions */}
			<div>
				
			</div>
		</main>
	);
}
