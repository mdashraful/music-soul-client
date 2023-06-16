import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const EnrolledClass = () => {
    const { user } = useContext(AuthContext)
    const [enrolledClass, setEnrolledClass] = useState([])
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/enrolledClass?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setEnrolledClass(data))
    }, [])
    console.log(enrolledClass)
    return (
        <>
            {enrolledClass.length > 0 ? (
                <div className="overflow-x-auto m-14 w-2/3 mx-auto">
                    <table className="table border">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-lg">
                                <th></th>
                                <th>Class Name</th>
                                <th>Price</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledClass.map((i, index) => (
                                <tr key={i._id} className="mb-3 ">
                                    <th>{index + 1}</th>
                                    <td className="font-bold">{i.className}</td>
                                    <td>$ {i.price}</td>
                                    <td className='text-teal font-semibold'>Successfull</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-3xl m-12 text-center">Not Enrolled class yet..</p>
            )}
        </>
    );
};

export default EnrolledClass;