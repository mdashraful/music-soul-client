import React from 'react';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <>
            <li>
                <NavLink
                    to="/dashboard/manageClasses"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : "font-semibold"
                    }
                >
                    <BsReverseLayoutTextSidebarReverse className="text-xl"></BsReverseLayoutTextSidebarReverse>
                    Manage Classes
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : "font-semibold"
                    }
                >
                    <FaUsers className="text-xl"></FaUsers>
                    Manage Users
                </NavLink>
            </li>
        </>
    );
};

export default AdminDashboard;