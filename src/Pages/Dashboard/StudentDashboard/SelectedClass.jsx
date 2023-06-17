import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const SelectedClass = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const token = localStorage.getItem('access_token')
    const { refetch, data: selected = [] } = useQuery({
        queryKey: ["selected", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selected?email=${user?.email}`);
            return res.data;
        },
    });
    const handleDelete = (id) => {
        axiosSecure.delete(`/selected/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                }
            })
    }
    return (
        <>
            {selected.length > 0 ? (
                <div className="overflow-x-auto m-14 w-2/3 mx-auto">
                    <table className="table border">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold">
                                <th></th>
                                <th>Class Name</th>
                                <th>Price</th>
                                <th>Pay</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selected.map((i, index) => (
                                <tr key={i._id} className="mb-3 ">
                                    <th>{index + 1}</th>
                                    <td className="font-bold">{i.className}</td>
                                    <td>$ {i.price}</td>
                                    <td>
                                        <Link to={`/dashboard/payment/${i._id}`} className="btn btn-outline btn-warning">Pay</Link>
                                    </td>

                                    <td className="">
                                        <div onClick={() => handleDelete(i._id)} className="btn btn-warning">
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-3xl m-12 text-center">Not selected yet..</p>
            )}
        </>
    );
};

export default SelectedClass;