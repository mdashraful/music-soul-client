import React from 'react';
import Banner from './Banner';
import PopularClasses from './PopularClasses';
import PopularInstructors from './PopularInstructors';
import Achievements from './Achievements';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses ></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <Achievements></Achievements>
        </div >
    );
};

export default Home;