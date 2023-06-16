import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        const {
            available_seat,
            classImg,
            className,
            enrolled,
            instructorEmail,
            instructorName,
            price,
        } = data;
        const addClassInfo = {
            available_seat: parseFloat(available_seat),
            classImg,
            className,
            enrolled: parseFloat(enrolled),
            instructorEmail,
            instructorName,
            instructorImg: user?.photoURL,
            price: parseFloat(price),
            status: "pending",
        };

        fetch(`${import.meta.env.VITE_API_URL}/addClass`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addClassInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    reset()
                    Swal.fire({
                        icon: "success",
                        title: "Successfully added this class",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        // console.log(addClassInfo)
    };
    return (
        <div className=" min-h-screen pt-20 bg-teal">
            <h1 className="text-5xl font-bold text-center pt-8 text-white">
                Add a Class!
            </h1>
            <div className="hero">
                <div className="hero-content">
                    <div className="rounded-md flex-shrink-0 shadow-2xl lg:w-[650px] bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={user?.displayName}
                                            {...register("instructorName")}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={user?.email}
                                            {...register("instructorEmail")}
                                            required
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Class Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            {...register("className")}
                                            required
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Price"
                                            {...register("price")}
                                            required
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Available Seat</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Available Seat"
                                            {...register("available_seat")}
                                            required
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Enrolled</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enrolled"
                                            value={0}
                                            {...register("enrolled")}
                                            className="input input-bordered"
                                        />
                                    </div>
                                </div>
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text">Class Photo URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="Class Photo URL"
                                        {...register("classImg")}
                                        required
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className="button" value="Add a Class" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClass;