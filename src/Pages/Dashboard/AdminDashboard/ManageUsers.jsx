import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';

const ManageUsers = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    // const [users, setUsers] = useState([]);
    // console.log(users);
    // useEffect(() => {
    //   fetch(`${import.meta.env.VITE_API_URL}/users`)
    //     .then((res) => res.json())
    //     .then((data) => setUsers(data));
    // }, []);
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
                    Swal.fire({
                        icon: "success",
                        title: `Successfully ${user.name} is admin now.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
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
                    Swal.fire({
                        icon: "success",
                        title: `Successfully ${user.name} is instructor now.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };
    return (
        <div className=" min-h-screen pt-20 bg-teal">
            <div className="overflow-x-auto m-14 w-2/3 mx-auto bg-white">
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
                                        <div disabled className="button">
                                            Instructor
                                        </div>
                                    </td>
                                ) : (
                                    <td className="" onClick={() => handleMakeInstructor(i)}>
                                        <div className="button-outline">Instructor</div>
                                    </td>
                                )}
                                {i.role === "admin" ? (
                                    <td>
                                        <div disabled className="button">
                                            Admin
                                        </div>
                                    </td>
                                ) : (
                                    <td className="">
                                        <div onClick={() => handleMakeAdmin(i)} className="button">
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