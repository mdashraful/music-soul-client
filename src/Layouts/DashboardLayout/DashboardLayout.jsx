import React, { useContext } from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import StudentDashboard from '../../Pages/Dashboard/StudentDashboard/StudentDashboard';
import AdminDashboard from '../../Pages/Dashboard/AdminDashboard/AdminDashboard';
import InstructorDashboard from '../../Pages/Dashboard/InstructorDashboard/InstructorDashboard';

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                    <label
                        htmlFor="my-drawer-2"
                        className="button drawer-button lg:hidden"
                    >
                        Dashboard
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content gap-2">
                        {/* Sidebar content here */}
                        <li>
                            <div className="mx-auto">
                                <Link to="/" className=" text-warning text-2xl md:text-4xl font-semibold">
                                    Music<span className="text-sm md:text-xl ">.Soul</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col mx-auto mb-3">
                                <img src={user?.photoURL} className="w-14 h-14 my-2" />
                                <p className="font-bold text-xl text-teal">
                                    {user?.displayName}
                                </p>
                            </div>
                        </li>
                        <li className="font-semibold">
                            <NavLink to="/">
                                <BiHome className="text-xl"></BiHome>
                                Home
                            </NavLink>
                        </li>
                        <li onClick={logOut} className="font-semibold">
                            <NavLink to='/'>
                                <AiOutlineLogout className="text-xl"></AiOutlineLogout>
                                Log Out
                            </NavLink>
                        </li>
                        <div className="divider my-2 font-semibold ">
                            ---------------------------------------------
                        </div>
                        {
                            isAdmin && <AdminDashboard></AdminDashboard>
                        }
                        {isInstructor && <InstructorDashboard></InstructorDashboard>}
                        {
                            !isAdmin && !isInstructor && <StudentDashboard></StudentDashboard>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;