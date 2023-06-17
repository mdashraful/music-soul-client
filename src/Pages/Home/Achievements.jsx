import React from 'react';
import SectionTitle from '../../Includes/SectionTitle';

const Achievements = () => {
    const achievements = [
        { number: '16k+', text: 'Our Registered Member' },
        { number: '10+', text: 'Already Learning' },
        { number: '100+', text: 'Award Winning' },
        { number: '50+', text: 'Vendor Platform Partner' },
    ]
    return (
        <>
            <SectionTitle
                title="Achievements"
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-10 mx-20 text-center ">
                {
                    achievements.map(a => <div className='border rounded-xl py-8' key={a.number}>
                        <h5 className='text-warning font-bold text-3xl'>{a.number}</h5>
                        <p>{a.text}</p>
                    </div>)
                }
            </div>
        </>
    );
};

export default Achievements;