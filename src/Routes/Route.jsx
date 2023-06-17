import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Instructors from '../Pages/Instructors/Instructors';
import SeeInstructorClass from '../Pages/Instructors/SeeInstructorClass';
import AllClasses from '../Pages/AllClasses/AllClasses';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import ManageClasses from '../Pages/Dashboard/AdminDashboard/ManageClasses';
import ManageUsers from '../Pages/Dashboard/AdminDashboard/ManageUsers';
import SelectedClass from '../Pages/Dashboard/StudentDashboard/SelectedClass';
import EnrolledClass from '../Pages/Dashboard/StudentDashboard/EnrolledClass';
import PaymentHistory from '../Pages/Dashboard/StudentDashboard/PaymentHistory';
import Payment from '../Pages/Dashboard/StudentDashboard/Payment';
import MyClass from '../Pages/Dashboard/InstructorDashboard/MyClass';
import AddClass from '../Pages/Dashboard/InstructorDashboard/AddClass';
import ErrorPage from '../Pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>,
            },
            {
                path: "/instructor/:email",
                element: <SeeInstructorClass></SeeInstructorClass>,
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_API_URL}/instructor/${params?.email}`),
            },
            {
                path: "/allClasses",
                element: <AllClasses></AllClasses>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            // student dashboard
            {
                path: "selectedClass",
                element: <SelectedClass></SelectedClass>,
            },
            {
                path: "enrolledClass",
                element: <EnrolledClass></EnrolledClass>,
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>,
            },
            {
                path: "payment/:id",
                element: <Payment></Payment>,
                // loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/selected/payment/${params.id}`)
            },

            // instructor dashboard
            {
                path: "myClass",
                element: (
                    <MyClass></MyClass>
                ),
            },
            {
                path: "addClass",
                element: (
                    <AddClass></AddClass>
                ),
            },

            // admin dashboard
            {
                path: "manageClasses",
                element: (
                    <ManageClasses></ManageClasses>
                ),
            },
            {
                path: "manageUsers",
                element: (
                    <ManageUsers></ManageUsers>
                ),
            },
        ],
    },
]);

export default router;