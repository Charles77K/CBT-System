import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import routesConfig from "./routes/routesConfig";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./services/http";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

function AppRoutes() {
	const element = useRoutes(routesConfig);
	return element;
}

function App() {
	return (
		<div className="h-screen w-full">
			<QueryClientProvider client={queryClient}>
				<ToastContainer />
				<Router
					future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
				>
					<AppRoutes />
				</Router>
			</QueryClientProvider>
		</div>
	);
}

export default App;
