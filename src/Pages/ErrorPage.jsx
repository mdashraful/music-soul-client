import { Controls, Player } from '@lottiefiles/react-lottie-player';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center'>
            <Player
                autoplay
                loop
                src="https://assets7.lottiefiles.com/packages/lf20_ghfpce1h.json"
                style={{ height: '500px', width: '500px' }}
            >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <div className='text-center'>
                <Link to='/' className='btn btn-neutral'>Back to Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;