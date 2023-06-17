import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../Includes/SectionTitle';

const PopularClasses = ({ dark }) => {
    const [musicClasses, setMusicClasses] = useState([]);
    // console.log(danceClasses)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/classes`)
            .then((res) => res.json())
            .then((data) => setMusicClasses(data));
    }, []);
    return (
        <div>
            <SectionTitle
                title="Popular Classes"
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {musicClasses.map((a) => (
                    <div
                        key={a._id}
                        className={`card card-side shadow-xl grid grid-cols-1 border ${dark && 'bg-slate-600'}`}
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
                                <Link to={'/allClasses'} className="btn btn-warning">Visit Now</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;