/* eslint-disable react-hooks/exhaustive-deps */
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
    const [localToken, setLocalToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLocalToken(token);
    }, [localStorage.getItem('token')]);

    const API = 'https://resume-dragger-production.up.railway.app';
    // const API = undefined;
    const callForUserInfo = async () => {
        try {
            setUserLoading(true);
            const { data } = await axios.get(API || 'http://localhost:8080/api/user', {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': API || 'http://localhost:8080',
                    Authorization: `Bearer ${localToken}`,
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
        if (localToken) {
            callForUserInfo();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localToken]);

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
