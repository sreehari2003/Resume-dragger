import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosHandler } from '../api';
import { Child } from '../types';

interface Dt {
    user: any;
    isUserLoading: boolean;
    callForUserInfo: () => void;
}
interface Data {
    name: string;
    resume: string;
    id: string;
}
interface File {
    name: string;
    id: string;
}
interface Folder {
    name: string;
    id: string;
    File: File[];
}

export interface Prop {
    resume: Data[];
    folder: Folder[];
}

interface User {
    data: Prop;
    ok: boolean;
}

export const AuthCtx = createContext({} as Dt);

const AuthContext = ({ children }: Child) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setUserLoading] = useState(true);
    const token = localStorage.getItem('token');

    const callForUserInfo = async () => {
        try {
            setUserLoading(true);
            const { data } = await AxiosHandler.get('api/user');
            if (!data || !data.ok) throw new Error();
            setUser(data);
        } catch (err) {
            // window.location.reload();
            navigate('/?fail=true');
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
    }, []);

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
