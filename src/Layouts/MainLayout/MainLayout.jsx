import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';

const MainLayout = () => {
    const [dark, setDark] = useState(false)
    return (
        <div className={` ${dark ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            <div className='max-w-screen-2xl mx-auto'>
                <Header setDark={setDark}></Header>
                <div className='min-h-[calc(100vh-100px)] mx-auto pt-16'>
                    <Outlet dark={dark}></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;