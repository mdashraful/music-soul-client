import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { toast } from 'react-hot-toast';

const AllClasses = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const [musicClasses, setMusicClasses] = useState([]);
    const navigate = useNavigate();
    // console.log(danceClasses)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/classes`)
            .then((res) => res.json())
            .then((data) => setMusicClasses(data));
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
                        toast.success('You Select this class. Pay this for continue!')
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
            {musicClasses.map((a, index) => (
                <div
                    key={index}
                    className={`card card-side shadow-xl grid grid-cols-1 border`}
                >
                    <img
                        className="h-64 w-full"
                        src={a.classImg}
                        alt="Music classes"
                    />
                    <div className="card-body">
                        <h2 className="card-title font-bold text-2xl">{a.className}</h2>
                        <p className="m-0 text-sm">{a.instructorName}</p>
                        <p className="text-warning font-semibold">Price: ${a.price}</p>
                        <p>Enrolled: {a.enrolled}</p>
                        <p className="">Available Seat: <span className='btn btn-neutral btn-outline'>{a.available_seat}</span></p>
                        <div className="card-actions justify-center mt-5">
                            <button disabled={isAdmin || isInstructor || a.available_seat === 0} onClick={() => handleSelect(a)} className={`btn btn-warning`}>
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