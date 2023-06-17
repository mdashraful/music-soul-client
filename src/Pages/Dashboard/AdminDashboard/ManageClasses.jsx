import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const ManageClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ["allClasses", user?.email],
        enabled:
            !loading && !!user?.email && !!localStorage.getItem("access_token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/allClasses`);
            return res.data;
        },
    });

    const handleApproveClass = (i) => {
        fetch(`${import.meta.env.VITE_API_URL}/allClasses/approve/${i._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    console.log(data)
                    toast.success(`Successfully ${i.className} added as class.`)
                }
            })
    }
    const handleDeniedClass = (i) => {
        // console.log(i)
        fetch(`${import.meta.env.VITE_API_URL}/allClasses/deny/${i._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    console.log(data)
                    toast.error(`You Denied ${i.className} class.`)
                }
            })
    }
    const handleFeedback = async (i) => {
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Feedback',
            inputPlaceholder: 'Type your feedback here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            fetch(`${import.meta.env.VITE_API_URL}/allClasses/feedback/${i._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ feedback: text })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        refetch()
                        Swal.fire(text)
                    }
                })
        }
    }
    return (
        <div className=" min-h-screen pt-20">
            <div className="overflow-x-auto w-11/12 mx-auto">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr className="font-semibold">
                            <th></th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((i, index) => (
                            <tr key={index} className="mb-3 ">
                                <th>{index + 1}</th>
                                <th>
                                    <img className="w-16" src={i.classImg} alt="" />
                                </th>
                                <td className="font-semibold">{i.className}</td>
                                <td>
                                    <p className="">{i.instructorName}</p>
                                    <p className="text-xs">{i.instructorEmail}</p>
                                </td>
                                <td>{i.available_seat}</td>
                                <td>$ {i.price}</td>
                                <td
                                    className={`font-semibold ${i.status === "approved" ? "text-warning" : "text-red-600"
                                        }`}
                                >
                                    {i.status}
                                </td>
                                <td >
                                    <button onClick={() => handleApproveClass(i)} disabled={i.status === "approved"} className="btn btn-warning btn-outline">Approve</button>
                                </td>
                                <td >
                                    <button onClick={() => handleDeniedClass(i)} disabled={i.status === "denied"} className="btn btn-neutral btn-outline">Deny</button>
                                </td>
                                <td>
                                    <button onClick={() => handleFeedback(i)} className="btn btn-warning">Send Feedback</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;