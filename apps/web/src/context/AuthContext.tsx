import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosHandler } from '../api';
import { Child } from '../types';

interface Dt {
    user: any;
}

export const AuthCtx = createContext({} as Dt);

const AuthContext = ({ children }: Child) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const token = localStorage.getItem('token');
    const [searchParams] = useSearchParams();
    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const { data } = await AxiosHandler.get('api/user');
                    if (!data || !data.ok) throw new Error();
                    setUser(data);
                } catch (err) {
                    window.location.reload();
                    // navigate('/?fail=true');
                }
            })();
        } else {
            navigate('/');
        }
    }, [navigate, token, searchParams]);

    const value = useMemo(
        () => ({
            user,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user]
    );

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export default AuthContext;
