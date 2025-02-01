import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
	const isUserAuth = useSelector((state) => state.userAuth.isAuth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isUserAuth) navigate("/login", { replace: true });
		console.log(isUserAuth);
	}, [isUserAuth, navigate]);

	return (
		<>
			{/* navbar */}
			<main>
				<Outlet />
			</main>
			{/* footer */}
		</>
	);
}
