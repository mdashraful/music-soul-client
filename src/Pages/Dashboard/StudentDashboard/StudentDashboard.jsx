import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineSelect } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { TfiWallet } from "react-icons/tfi";

const StudentDashboard = () => {
    return (
        <>
            <li>
                <NavLink
                    to="/dashboard/selectedClass"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : "font-semibold"
                    }
                >
                    <AiOutlineSelect className="text-xl"></AiOutlineSelect>
                    My Selected Class
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/enrolledClass"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : "font-semibold"
                    }
                >
                    <BiSelectMultiple className="text-xl"></BiSelectMultiple>
                    My Enrolled Class
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/paymentHistory"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : "font-semibold"
                    }
                >
                    <TfiWallet className="text-xl"></TfiWallet>
                    Payment History
                </NavLink>
            </li>
        </>
    );
};

export default StudentDashboard;