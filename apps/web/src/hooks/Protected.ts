import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Protected = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, token]);

    return null;
};
