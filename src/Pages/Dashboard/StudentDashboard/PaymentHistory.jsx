import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const [paymentHistory, setPaymentHistory] = useState([])
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/paymentHistory?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setPaymentHistory(data))
    }, [])
    console.log(paymentHistory)
    return (
        <>
            {paymentHistory.length > 0 ? (
                <div className="overflow-x-auto m-14 w-2/3 mx-auto">
                    <table className="table border">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold">
                                <th></th>
                                <th>Class Name</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((i, index) => (
                                <tr key={i._id} className="mb-3 ">
                                    <th>{index + 1}</th>
                                    <td className="font-bold">{i.className}</td>
                                    <td>$ {i.price}</td>
                                    <td className='text-warning'>{i.transactionId}</td>
                                    <td>{i.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-3xl m-12 text-center">No Payment History yet..</p>
            )}
        </>
    );
};

export default PaymentHistory;