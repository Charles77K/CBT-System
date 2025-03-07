import AdminLoginForm from "../../components/AdminLoginForm";
import AdminLoginSide from "../../components/AdminLoginSide";

export default function AdminLogin() {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="h-1/2 sm:h-full max-h-[90%] w-[80%] shadow-xl shadow-gray-600/50 rounded-xl flex">
        <div className="bg-brandBlue flex-1 items-center rounded-l-xl hidden sm:block">
          <AdminLoginSide />
        </div>
        <div className="bg-white flex-1 rounded-r-xl">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
