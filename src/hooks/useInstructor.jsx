import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { data: isInstructor, isLoading: isInstructorLoading, refetch } = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,
        queryFn: async () => {
            if (!user) {
                return false;
            }
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            return res.data.instructor
        }
    })
    return [isInstructor, isInstructorLoading, refetch]
};

export default useInstructor;