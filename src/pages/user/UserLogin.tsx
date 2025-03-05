import AdminLoginSide from "../../components/AdminLoginSide";
import UserLoginForm from "../../components/UserLoginForm";

export default function UserLogin() {
  return (
    <div className="h-screen flex justify-center items-center drop-shadow-lg">
      <div className="w-[80%] h-[90vh] shadow-xl shadow-gray-600/50 rounded-xl grid grid-col-2 grid-flow-col">
        <div className="bg-brandBlue items-center rounded-l-xl hidden sm:block">
          <AdminLoginSide />
        </div>
        <div className="bg-white rounded-r-xl">
          <UserLoginForm />
        </div>
      </div>
    </div>
  );
}
