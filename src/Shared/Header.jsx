import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const Header = ({ setDark }) => {
    const { user, logOut } = useContext(AuthContext);
    // const [dropdownNav, setDropdownNav] = useState(false);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const navLinkList = (
        <>
            <li>
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* sun icon */}
                    <svg
                        onClick={() => setDark(true)}
                        className="swap-on fill-current w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        onClick={() => setDark(false)}
                        className="swap-off fill-current w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
            </li>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/instructors"
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                >
                    Instructors
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allClasses"
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                >
                    Classes
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink
                        to={`${isAdmin
                            ? "/dashboard/manageClasses"
                            : isInstructor
                                ? "dashboard/myClass"
                                : "/dashboard/selectedClass"
                            }`}
                        className={({ isActive }) => (isActive ? "activeLink" : "")}
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );
    return (
        <div className='navbar z-10 bg-black text-white bg-opacity-60 shadow-lg fixed top-0 left-0 right-0 px-3 py-0 max-w-screen-2xl mx-auto'>
            <div className="navbar px-3  justify-between">
                <div className="navbar-start">
                    <Link to="/" className=" text-warning text-2xl md:text-4xl md:flex items-end font-semibold">
                        Music<span className="text-sm md:text-xl ">.Soul</span>
                    </Link>
                </div>
                <div className="navbar-center">
                    <div className="hidden lg:flex px-5">
                        <div className="menu menu-horizontal px-1 flex ">
                            {navLinkList}
                        </div>
                    </div>
                </div>
                <div className='navbar-end'>
                    <div className='hidden lg:flex'>
                        {user ? (
                            <div className="hidden md:flex">
                                <img
                                    className="rounded-full w-12 mr-3"
                                    src={user.photoURL}
                                    alt="Profile Image"
                                    title={user.displayName}
                                />
                                <Link onClick={logOut} className="btn btn-warning">
                                    Log out
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-outline btn-warning">
                                Log in
                            </Link>
                        )}
                    </div>

                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <div
                            tabIndex={0}
                            className="menu bg-white text-black menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-32 right-2"
                        >
                            {navLinkList}
                            {user ? (
                                <>
                                    <li className="avatar">
                                        <div className="w-[44px] rounded-full">
                                            <img src={user.photoURL} title={user.displayName} />
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={logOut} className="button">
                                            Log Out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className="button">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;