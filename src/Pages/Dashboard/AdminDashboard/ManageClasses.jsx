import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // const [classes, setClasses] = useState([]);
    // console.log(classes)
    // useEffect(() => {
    //   fetch(`${import.meta.env.VITE_API_URL}/allClasses`)
    //     .then((res) => res.json())
    //     .then((data) => setClasses(data));
    // }, []);
    const { data: classes = [], refetch } = useQuery({
        queryKey: ["allClasses", user?.email],
        enabled:
            !loading && !!user?.email && !!localStorage.getItem("access_token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/allClasses`);
            // console.log(res)
            return res.data;
        },
    });

    const handleApproveClass = (i) => {
        // console.log(i)
        fetch(`${import.meta.env.VITE_API_URL}/allClasses/approve/${i._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    console.log(data)
                    Swal.fire({
                        icon: "success",
                        title: `Successfully ${i.className} added as class.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
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
                    Swal.fire({
                        icon: "success",
                        title: `You Denied ${i.className} class.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
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
        <div className=" min-h-screen pt-20 bg-teal">
            <div className="overflow-x-auto w-11/12 mx-auto bg-white">
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
                                    <p className="font-semibold">{i.instructorName}</p>
                                    <p className="text-sm">{i.instructorEmail}</p>
                                </td>
                                <td>{i.available_seat}</td>
                                <td>$ {i.price}</td>
                                <td
                                    className={`font-semibold ${i.status === "approved" ? "text-teal" : "text-red-600"
                                        }`}
                                >
                                    {i.status}
                                </td>
                                <td >
                                    <button onClick={() => handleApproveClass(i)} disabled={i.status === "approved"} className="button-outline">Approve</button>
                                </td>
                                <td >
                                    <button onClick={() => handleDeniedClass(i)} disabled={i.status === "denied"} className="button-outline ">Deny</button>
                                </td>
                                <td>
                                    <div onClick={() => handleFeedback(i)} className="button">Send Feedback</div>
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