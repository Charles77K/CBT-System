import examLogo from "../assets/images/exam-log.png";

export default function AdminLoginSide() {
	return (
		<div className="h-full flex flex-col justify-center items-center text-white">
			<img src={examLogo} className="w-full max-w-[400px] h-auto" />
			<div className="text-center max-w-[400px]">
				<h2 className="font-bold text-xl my-2">E-Exam</h2>
				<p className="font-light leading-1 md:text-[16px] md:leading-[1.7] sm:text-xs text-[10px]">
					Unlock Your Potential with Every Question – Seamless Exam Creation and
					Effortless Grading for a Smarter Future
				</p>
			</div>
		</div>
	);
}
