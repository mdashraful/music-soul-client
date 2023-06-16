import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };
    const logOut = () => {
        localStorage.removeItem("access_token");
        return signOut(auth);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser)
            if (currentUser?.email) {
                axios
                    .post(`${import.meta.env.VITE_API_URL}/jwt`, {
                        email: currentUser.email,
                    })
                    .then((data) => {
                        // console.log(data.data);
                        localStorage.setItem("access_token", data.data.token);
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem("access_token");
                setLoading(false);
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, [auth]);

    const authInfo = {
        user,
        createUser,
        login,
        updateUserProfile,
        loading,
        googleLogin,
        logOut,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;