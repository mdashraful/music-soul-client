import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Includes/SectionTitle';

const PopularInstructors = ({ dark }) => {
    const [instructors, setInstructors] = useState([]);
    // console.log(danceClasses)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/instructors`)
            .then((res) => res.json())
            .then((data) => setInstructors(data));
    }, []);
    return (
        <div>
            <SectionTitle
                subTitle="The art of teaching is the art of assisting discovery."
                title="Popular Instructors"
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-20">
                {instructors.slice(0, 6).map((i, index) => (
                    <div key={i._id} className={`card border shadow-md ${dark && 'bg-slate-600'}`}>
                        <figure>
                            <img src={i.instructorImg} alt="Instructor" />
                        </figure>
                        <div className="card-body">
                            <div className="lg:flex justify-between items-center">
                                <h2 className="card-title text-2xl text-teal">
                                    {i.instructorName}
                                </h2>
                                <p className="opacity-60 lg:text-right">{i.instructorEmail}</p>
                            </div>
                            <p className="font-semibold">{i.className}</p>
                            <p>
                                Experienced as a professional {i.className}r for {index + 2}{" "}
                                years.
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PopularInstructors;