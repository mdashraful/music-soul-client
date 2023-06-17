import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Controls, Player } from '@lottiefiles/react-lottie-player';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        login(data.email, data.password)
            .then(result => {
                const user = result.user
                const savedUser = { email: user.email, name: user.displayName, role: 'student' }
                // console.log(savedUser)
                fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                setError('')
                navigate(from, { replace: true })
            })
            .catch(err => setError(err.message))
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                console.log(result.user)
                const user = result.user
                const savedUser = { email: user.email, name: user.displayName, role: 'student' }
                fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                navigate(from, { replace: true })
            })
            .catch(err => console.log(err.message))
    };
    return (
        <div className=" min-h-screen pt-20  lg:flex items-center justify-center">
            <div>
                <Player
                    autoplay
                    loop
                    src="https://assets5.lottiefiles.com/private_files/lf30_kj1v7uim.json"
                    style={{ height: '500px', width: '500px' }}
                >
                    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                </Player>
            </div>
            <div>
                <h1 className="text-5xl font-bold text-center pt-8 text-warning">Login now!</h1>
                <div className="hero">
                    <div className="hero-content">
                        <div className="rounded-md flex-shrink-0 shadow-2xl w-[400px] bg-base-100">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")}
                                            required
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            {...register("password")}
                                            required
                                            className="input input-bordered"
                                        />
                                    </div>
                                    {
                                        error && <p className="text-red-600 mt-2 ml-1">{error}</p>
                                    }
                                    <div className="form-control mt-6">
                                        <input type="submit" className="btn btn-warning" />
                                    </div>
                                </form>
                                <div className="divider mt-5 mb-2">OR</div>
                                <div onClick={handleGoogleLogin} className="form-control mt-6">
                                    <button className="btn btn-warning btn-outline">Google Login</button>
                                </div>
                                <p className="text-sm mt-2 ml-1">
                                    New at Music Soul? Please{" "}
                                    <Link to="/register" className="text-warning underline font-semibold">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;