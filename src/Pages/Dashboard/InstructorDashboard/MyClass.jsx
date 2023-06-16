import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyClass = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    // const [myClass, setMyClass]= useState([])
    // useEffect(()=>{
    //     fetch(`${import.meta.env.VITE_API_URL}/myClass?email=${user?.email}`)
    //     .then(res => res.json())
    //     .then(data => setMyClass(data))
    // },[])
    const { refetch, data: myClass = [] } = useQuery({
        queryKey: ["myClass", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClass/${user?.email}`);
            return res.data;
        },
    });
    // console.log(myClass)
    return (
        <div className=' min-h-screen pt-20 bg-teal'>
            <div className="overflow-x-auto m-14 w-2/3 mx-auto bg-white">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr className="font-semibold">
                            <th></th>
                            <th>Class Name</th>
                            <th>Enrolled</th>
                            <th>Status</th>
                            <th>FeedBack</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myClass.map((i, index) => <tr key={index} className="mb-3 ">
                                <th>{index + 1}</th>
                                <td className="font-semibold">{i.className}</td>
                                <td>{i.enrolled}</td>
                                <td>{i.status}</td>
                                <td>{i?.feedback}</td>
                                <td className="">
                                    <div className="btn btn-outline hover:bg-[#019999] border border-[#019999] hover:text-white">
                                        Update
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClass;