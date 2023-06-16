import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const AllClasses = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const [danceClasses, setDanceClasses] = useState([]);
    const navigate = useNavigate();
    // console.log(danceClasses)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/classes`)
            .then((res) => res.json())
            .then((data) => setDanceClasses(data));
    }, []);

    const handleSelect = (selectClass) => {
        const { classImg, className, price, _id } = selectClass;
        selectClass.studentEmail = user?.email;
        if (user) {
            fetch(`${import.meta.env.VITE_API_URL}/selected`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ classImg, className, price, studentEmail: user?.email, classId: _id })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        Swal.fire({
                            title: 'Congratulations!',
                            text: 'You Select this class. Pay this for continue.',
                            imageUrl: `${selectClass.classImg}`,
                            imageWidth: 300,
                            imageHeight: 200,
                            imageAlt: 'Class image',
                        })
                        navigate("/dashboard/selectedClass");
                    }
                })
        }
        else {
            Swal.fire({
                title: "You have to log in before select this",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/dashboard/selectedClass");
                }
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {danceClasses.map((i, index) => (
                <div key={index} className={`card border shadow-md ${i.available_seat === 0 && 'bg-red-400'}`}>
                    <figure>
                        <img className="h-56" src={i.classImg} alt="Dance class" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold text-2xl">{i.className}</h2>
                        <div className="lg:flex justify-between items-center">
                            <h2 className="card-title text-lg">{i.instructorName}</h2>
                            <p className="opacity-60 lg:text-right">{i.instructorEmail}</p>
                        </div>
                        <p className="text-teal font-semibold">Price: ${i.price}</p>
                        <div className="flex justify-between">
                            <p>Enrolled: {i.enrolled}</p>
                            <p className="text-right">Available Seat: {i.available_seat}</p>
                        </div>
                        <div className="card-actions justify-center mt-5">
                            <button disabled={isAdmin || isInstructor || i.available_seat === 0} onClick={() => handleSelect(i)} className={`button`}>
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllClasses;