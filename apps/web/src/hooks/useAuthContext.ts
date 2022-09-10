import { useContext } from 'react';
import { AuthCtx } from '../context/AuthContext';

export const useAuth = () => useContext(AuthCtx);
