import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

function AppRoutes() {
  const element = useRoutes(routesConfig);
  return element;
}

function App() {
  return (
    <div className="h-screen w-full">
      <ToastContainer />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
