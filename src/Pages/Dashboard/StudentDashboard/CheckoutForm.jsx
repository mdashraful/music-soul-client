import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ price, id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [paymentClass, setPaymentClass] = useState();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intend", { price }).then((res) => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [price]);

    useEffect(() => {
        axiosSecure.get(`/fromSelect/${id}`).then((res) => {
            // console.log(res.data.clientSecret)
            setPaymentClass(res.data);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[error]", error);
            setCardError(error.message);
        } else {
            setCardError("");
            // console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "anonymous",
                        email: user?.email || "anonymous",
                    },
                },
            });
        if (confirmError) {
            console.log(confirmError);
        }
        setProcessing(false);

        if (paymentIntent?.status === "succeeded") {
            console.log("paymentIntent", paymentIntent);
            setTransactionId(paymentIntent.id);
            const { classId, classImg, className, studentEmail, price } =
                paymentClass;
            const paymentData = {
                classId,
                classImg,
                className,
                studentEmail,
                price,
                transactionId: paymentIntent.id,
                date: new Date(),
            };
            axiosSecure.post("/payments", paymentData).then((res) => {
                if (res.data.insertedId) {
                    axiosSecure.delete(`/fromSelect/${classId}`).then((res) => {
                        console.log(res.data);
                        if (res.data.deleteResult.deletedCount > 0) {
                            toast.success('Payment Successfull!')
                        }
                    });
                }
            });
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className="btn btn-warning mt-6"
                >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600">{cardError}</p>}
            {transactionId && (
                <p className="text-warning">
                    Transacion successfull with transactionId: {transactionId}
                </p>
            )}
        </>
    );
};

export default CheckoutForm;