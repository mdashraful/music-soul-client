import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access_token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            console.log(res)
            return res.data;
        },
    });

    const handleMakeAdmin = (user) => {
        fetch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Successfully ${user.name} is admin now.`)
                }
            });
    };

    const handleMakeInstructor = (user) => {
        fetch(`${import.meta.env.VITE_API_URL}/users/instructor/${user._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Successfully ${user.name} is instructor now.`)
                }
            });
    };
    return (
        <div className=" min-h-screen pt-20">
            <div className="overflow-x-auto m-14 w-2/3 mx-auto">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr className="font-semibold">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((i, index) => (
                            <tr key={index} className="mb-3 ">
                                <th>{index + 1}</th>
                                <td className="font-semibold">{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.role}</td>
                                {i.role === "instructor" ? (
                                    <td>
                                        <div disabled className="btn">
                                            Instructor
                                        </div>
                                    </td>
                                ) : (
                                    <td className="" onClick={() => handleMakeInstructor(i)}>
                                        <div className="btn btn-warning btn-outline">Instructor</div>
                                    </td>
                                )}
                                {i.role === "admin" ? (
                                    <td>
                                        <div disabled className="btn">
                                            Admin
                                        </div>
                                    </td>
                                ) : (
                                    <td className="">
                                        <div onClick={() => handleMakeAdmin(i)} className="btn btn-warning btn-outline">
                                            Admin
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;