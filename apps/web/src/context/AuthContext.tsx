import axios from 'axios';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Child } from '../types';
import { Dt, User } from './type';

export const AuthCtx = createContext({} as Dt);

const AuthContext = ({ children }: Child) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setUserLoading] = useState(true);
    const token = localStorage.getItem('token');

    const callForUserInfo = async () => {
        try {
            setUserLoading(true);
            const { data } = await axios.get('http://localhost:8080/api/user', {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!data.ok) throw new Error();
            setUser(data);
        } catch (err) {
            navigate('/');
        } finally {
            setUserLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            callForUserInfo();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const value = useMemo(
        () => ({
            user,
            isUserLoading,
            callForUserInfo,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, isUserLoading]
    );

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export default AuthContext;
