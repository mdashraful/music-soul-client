import React from 'react';

const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className='text-center mt-20 mb-10'>
            <h2 className={`text-5xl font-semibold `}>{title}</h2>
            <div className="divider w-36 mx-auto">------------</div>
            <p className='text-teal'>***{subTitle}***</p>
        </div>
    );
};

export default SectionTitle;