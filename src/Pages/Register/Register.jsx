import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        // console.log(data);

        if (data.password !== data.confirm) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your Confirm Password is wrong",
            });
        }

        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                // console.log(result.user)
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                console.log(result.user);
                const user = result.user;
                const savedUser = { email: user.email, name: user.displayName, role: 'student' };
                fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(savedUser),
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data));
                navigate(from, { replace: true });
            })
            .catch((err) => console.log(err.message));
    };
    return (
        <div className=" min-h-screen pt-20 bg-teal">
            <h1 className="text-5xl font-bold text-center pt-8 text-white">
                Register now!
            </h1>
            <div className="hero">
                <div className="hero-content">
                    <div className="rounded-md flex-shrink-0 shadow-2xl lg:w-[650px] bg-base-100">
                        <div className="card-body">
                            <div onClick={handleGoogleLogin} className="form-control mt-6">
                                <button className="button-outline">Google Login</button>
                            </div>
                            <div className="divider mt-5 mb-2">OR</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="name"
                                            placeholder="Name"
                                            {...register("name", { required: true })}
                                            className="input input-bordered"
                                        />
                                        {errors.name && (
                                            <span className="text-red-600">Name is required</span>
                                        )}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            {...register("email", { required: true })}
                                            className="input input-bordered"
                                        />
                                        {errors.email && (
                                            <span className="text-red-600">Email is required</span>
                                        )}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                pattern:
                                                    /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            })}
                                            className="input input-bordered"
                                        />
                                        {errors.password?.type === "required" && (
                                            <span className="text-red-600">Password is required</span>
                                        )}
                                        {errors.password?.type === "minLength" && (
                                            <span className="text-red-600">
                                                Password must be 6 characters
                                            </span>
                                        )}
                                        {errors.password?.type === "pattern" && (
                                            <span className="text-red-600">
                                                Password must have one Uppercase, one lowercase, one
                                                number and one special characters.
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            {...register("confirm", { required: true })}
                                            className="input input-bordered"
                                        />
                                        {errors.confirm && (
                                            <span className="text-red-600">
                                                Confirm Password is required
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="Photo URL"
                                        {...register("photo", { required: true })}
                                        className="input input-bordered"
                                    />
                                    {errors.photo && (
                                        <span className="text-red-600">Photo URL is required</span>
                                    )}
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className="button" />
                                </div>
                            </form>
                            <p className="text-sm mt-2 ml-1">
                                Already have an account? Please{" "}
                                <Link to="/login" className="text-teal font-semibold">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;