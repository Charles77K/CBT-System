import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md"; // Import logout icon
import PropTypes from "prop-types";
import { useState } from "react";
import LogoutModal from "../ui/LogoutModal";
import { useDispatch } from "react-redux";
import { removeEmail } from "../store/authSlice";

const sideBarOptions = [
	{
		link: "dashboard",
		render: "Dashboard",
	},
	{
		link: "candidates",
		render: "Candidates",
	},
	{
		link: "exams",
		render: "Exams",
	},
	{
		link: "create",
		render: "Create Question",
	},
];

export default function AdminSiderBar({ Open, Close }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	const handleLogout = () => {
		console.log("Logout clicked");
		dispatch(removeEmail());
		navigate("/admin/login", { replace: true });
	};

	return (
		<nav className="p-4 h-full flex flex-col w-full">
			<h1 className="md:block hidden text-xl font-bold mt-5 mb-10">
				E<span className="text-brandBlue text-2xl">-Exam</span>
			</h1>

			{/* Desktop sidebar options */}
			<div className="hidden md:flex flex-col gap-5 flex-grow">
				{sideBarOptions.map((option, index) => (
					<NavLink
						key={index}
						to={`/admin/${option.link}`}
						className={({ isActive }) =>
							`flex items-center gap-4 p-2 rounded-lg ${
								isActive
									? "bg-white text-black font-semibold border-2 border-brandBlue"
									: "text-gray-500"
							}`
						}
					>
						{({ isActive }) => (
							<>
								<span>
									<MdDashboard size={15} color={isActive ? "black" : "gray"} />
								</span>
								<span>{option.render}</span>
							</>
						)}
					</NavLink>
				))}

				{/* Desktop Logout Button */}
				<button
					onClick={() => setModal(true)}
					className="flex items-center mt-20 gap-4 p-2 rounded-lg text-red-500 font-bold hover:text-red-700 hover:bg-gray-200 transition"
				>
					<MdLogout size={15} />
					<span>Logout</span>
				</button>
			</div>

			{/* Mobile sidebar options */}
			{Open && (
				<div className="gap-5 flex flex-col max-w-[15rem] p-4 w-full fixed top-12 left-0 z-50 bg-gray-100 h-full">
					{sideBarOptions.map((option, index) => (
						<NavLink
							onClick={Close}
							key={index}
							to={`/admin/${option.link}`}
							className={({ isActive }) =>
								`flex text-xs md:text-sm items-center gap-4 p-2 rounded-lg ${
									isActive
										? "bg-white text-black font-semibold border-2 border-brandBlue"
										: "text-gray-500"
								}`
							}
						>
							{({ isActive }) => (
								<>
									<span>
										<MdDashboard
											size={15}
											color={isActive ? "black" : "gray"}
										/>
									</span>
									<span>{option.render}</span>
								</>
							)}
						</NavLink>
					))}

					{/* Mobile Logout Button */}
					<button
						onClick={() => {
							setModal(true);
						}}
						className="flex items-center mt-20 gap-4 p-2 rounded-lg text-red-500 font-bold hover:text-red-700 hover:bg-gray-200 transition"
					>
						<MdLogout size={15} />
						<span>Logout</span>
					</button>
				</div>
			)}
			{modal && (
				<LogoutModal
					noText="No"
					onCancel={() => setModal(false)}
					onNo={() => setModal(false)}
					onYes={handleLogout}
					title="Are you sure you want to logout?"
					yesText="Yes"
				/>
			)}
		</nav>
	);
}

AdminSiderBar.propTypes = {
	Open: PropTypes.bool,
	Close: PropTypes.func,
};
