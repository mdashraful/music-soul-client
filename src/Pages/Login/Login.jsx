import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';

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
        <div className=" min-h-screen pt-20 bg-teal">
            <h1 className="text-5xl font-bold text-center pt-8 text-white">Login now!</h1>
            <div className="hero">
                <div className="hero-content">
                    <div className="rounded-md flex-shrink-0 shadow-2xl w-[400px] bg-base-100">
                        <div className="card-body">
                            <div onClick={handleGoogleLogin} className="form-control mt-6">
                                <button className="button-outline">Google Login</button>
                            </div>
                            <div className="divider mt-5 mb-2">OR</div>
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
                                    <input type="submit" className="button" />
                                </div>
                            </form>
                            <p className="text-sm mt-2 ml-1">
                                New at Toys & Hobbies? Please{" "}
                                <Link to="/register" className="text-teal font-semibold">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;