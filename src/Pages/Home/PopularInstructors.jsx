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
                title="Popular Instructors"
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {instructors.slice(0, 6).map((i, index) => (
                    <div key={index} className={`card border shadow-md ${dark && 'bg-slate-600'}`}>
                        <figure>
                            <img className='h-72 w-full' src={i.instructorImg} alt="Instructor" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-warning">
                                {i.instructorName}
                            </h2>
                            <p className="opacity-60">{i.instructorEmail}</p>
                            <p className="font-semibold">{i.className}</p>
                            <p>
                                Hi! I am {i.instructorName}. You are going to expert at {i.className}. So let us start...
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PopularInstructors;