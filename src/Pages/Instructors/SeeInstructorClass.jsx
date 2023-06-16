import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const SeeInstructorClass = () => {
    const instructorClass = useLoaderData();
    //   console.log(instructorClass);
    return (
        <div className=" w-3/2 mx-auto mt-12">
            {instructorClass?.map((a) => (
                <div
                    key={a._id}
                    className=" md:w-2/3 mx-auto card card-side shadow-xl grid grid-cols-2"
                >
                    <figure>
                        <img
                            className="h-64 rounded-xl ml-4"
                            src={a.classImg}
                            alt="Dance classes"
                        />
                    </figure>
                    <div className="card-body">
                        <div>
                            <h2 className="card-title font-bold text-3xl">{a.className}</h2>
                            <div className="flex items-center space-x-3 my-3">
                                <div className="avatar">
                                    <div className=" rounded-full w-12 h-12">
                                        <img src={a.instructorImg} alt="Instructor image" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">{a.instructorName}</div>
                                    <div className="text-sm opacity-50">{a.instructorEmail}</div>
                                </div>
                            </div>
                            <p className="text-teal font-semibold text-lg">Price: ${a.price}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Enrolled: {a.enrolled}</p>
                            <p className="text-right">Available Seat: {a.available_seat}</p>
                        </div>
                        <div className="card-actions justify-end mt-5">
                            <Link to={'/allClasses'} className="button">Visit Now</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SeeInstructorClass;