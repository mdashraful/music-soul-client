import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    // console.log(instructors)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/instructor`)
            .then((res) => res.json())
            .then((data) => setInstructors(data));
    }, []);
    return (
        <div className="grid grid-cols-1 gap-5">
            {instructors.map((i) => (
                <div
                    key={i._id}
                    className=" md:w-2/4 mx-auto border card card-side shadow-xl grid grid-cols-2"
                >
                    <figure>
                        <img
                            className="h-52 rounded-xl ml-4"
                            src={i.instructorImg}
                            alt="Dance classes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold text-2xl">
                            {i.instructorName}
                        </h2>
                        <p className="m-0 ">{i.instructorEmail}</p>
                        <p className="text-teal">Classes: {i.className}</p>
                        <div className="flex justify-between">
                            <p>Enrolled: {i.enrolled}</p>
                            <p className="text-right">Available Seat: {i.available_seat}</p>
                        </div>
                        <div className="card-actions justify-end mt-5">
                            <Link
                                to={`/instructor/${i._id}`}
                                className="button"
                            >
                                See Classes
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Instructors;