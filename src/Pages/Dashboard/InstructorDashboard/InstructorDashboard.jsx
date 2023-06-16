import React from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const InstructorDashboard = () => {
    return (
        <>
            <li>
                <NavLink
                    to="/dashboard/myClass"
                    className={({ isActive }) =>
                        isActive ? "bg-teal text-white font-semibold" : "font-semibold"
                    }
                >
                    <BiSelectMultiple className="text-xl"></BiSelectMultiple>
                    My Classes
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/addClass"
                    className={({ isActive }) =>
                        isActive ? "bg-teal text-white font-semibold" : "font-semibold"
                    }
                >
                    <AiOutlineAppstoreAdd className="text-xl"></AiOutlineAppstoreAdd>
                    Add a Class
                </NavLink>
            </li>
        </>
    );
};

export default InstructorDashboard;