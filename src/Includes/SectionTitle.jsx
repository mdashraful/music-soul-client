import React from 'react';

const SectionTitle = ({ title }) => {
    return (
        <div className='text-center mt-20 mb-10'>
            <h2 className={`text-5xl font-semibold `}>{title}</h2>
            <div className="divider w-48 mx-auto">__________________________</div>
        </div >
    );
};

export default SectionTitle;