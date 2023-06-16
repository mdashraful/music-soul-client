import { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = `Bearer ${localStorage.getItem('access_token')}`
            if (token) {
                // console.log(config.headers)
                config.headers.Authorization = token
            }
            return config;
        })

        axiosSecure.interceptors.response.use(response => response, async error => {
            if (error.response && error.response?.status === 401 || error.response?.status === 403) {
                // await logOut()
                // navigate('/login')
                navigate('/')
            }
            return Promise.reject(error)
        })
    }, [logOut, navigate])

    return [axiosSecure]
};

export default useAxiosSecure;