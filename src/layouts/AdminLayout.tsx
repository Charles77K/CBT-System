import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AdminSiderBar from "../components/AdminSiderBar";
import Button from "../components/Button";

export default function AdminLayout() {
  const email = useSelector((state) => state.auth.email);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (!isAuth) navigate("/admin/login", { replace: true });
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return (
    <div className="h-full">
      <div className="flex md:hidden justify-between items-center p-3 border-b-2">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <IoMdClose size={20} color="black" />
          ) : (
            <IoMenuSharp size={20} color="black" />
          )}
        </button>
        <h1 className="text-lg font-bold">
          E<span className="text-brandBlue text-xl">-Exam</span>
        </h1>
      </div>

      <div className="h-screen flex">
        {/* Sidebar */}
        <div
          className={`fixed md:relative top-0 left-0 h-full bg-gray-100 max-w-[20rem] w-full z-50 transform transition-transform duration-300
					${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block overflow-hidden`}
        >
          <AdminSiderBar Open={isOpen} Close={() => setIsOpen(false)} />
        </div>

        {/* Backdrop for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-white overflow-y-auto">
          {/* Header */}
          <div className="text-xs md:text-sm flex justify-between">
            <section>
              <p className="font-semibold mb-1">Hello, {email} </p>
              <p>Welcome back to e-Exam</p>
            </section>
            <Link to="/admin/create">
              <Button className="bg-blue-600 rounded-md text-xs md:text-sm shadow-sm md:p-2 p-1 text-white">
                <p>Create Exam</p>
              </Button>
            </Link>
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-5"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
