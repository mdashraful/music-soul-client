import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Api_Key);
const Payment = () => {
    const { id } = useParams()
    const [price, setPrice] = useState(0)
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/selected/payment/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setPrice(data.price))
    }, [id])

    return (
        <div className=" min-h-screen pt-20 bg-teal">
            <div className="overflow-x-auto m-14 w-2/3 mx-auto bg-white p-5">
                <p className="text-center text-2xl mb-5">Payment</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} id={id}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;