import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const SeeInstructorClass = () => {
    const instructorClass = useLoaderData();
    //   console.log(instructorClass);
    return (
        <div className=" w-3/2 mx-auto mt-12">
            {instructorClass?.map((i) => (
                <div
                    key={i._id}
                    className=" md:w-2/3 mx-auto card card-side shadow-xl grid grid-cols-2"
                >
                    <figure>
                        <img
                            className="h-60 rounded-xl ml-4"
                            src={i.instructorImg}
                            alt="instructor"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold text-2xl">
                            {i.instructorName}
                        </h2>
                        <p className="m-0 ">{i.instructorEmail}</p>
                        <p className="text-warning">Classes: {i.className}</p>
                        <p>Enrolled: {i.enrolled}</p>
                        <p className="">Available Seat: {i.available_seat}</p>
                        <div className="card-actions justify-end mt-5">
                            <Link
                                to={`/allClasses`}
                                className="btn btn-warning btn-outline"
                            >
                                Visit Now
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SeeInstructorClass;