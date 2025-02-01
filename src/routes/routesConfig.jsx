import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "./../pages/admin/Dashboard";
import Candidates from "../pages/admin/Candidates";
import Exam from "../pages/admin/Exam";
import CreateQuestion from "../pages/admin/CreateQuestion";
import UserLogin from "../pages/user/UserLogin";
import StartExam from "../pages/user/StartExam";

const routesConfig = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <StartExam /> },
			{ path: "login", element: <UserLogin /> },
		],
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{ path: "dashboard", element: <Dashboard /> },
			{
				path: "create",
				element: <CreateQuestion />,
			},
			{
				path: "candidates",
				element: <Candidates />,
			},
			{
				path: "exams",
				element: <Exam />,
			},
		],
		// Add any child routes that should use AdminLayout here (if needed)
	},
	{
		path: "/admin/login",
		element: <AdminLogin />, // AdminLogin is outside of AdminLayout
	},
];

export default routesConfig;
