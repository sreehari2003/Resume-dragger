import axios from 'axios';
import useSwr from 'swr';
import { Info } from '../types';

export interface Error {
    message: string;
}

interface ReturnVal {
    error: Error | null;
    isLoading: boolean;
    data: Info | null;
}

export const useResume = (): ReturnVal => {
    const URL = 'https://api.jsonbin.io/v3/b/603e095481087a6a8b944bd4';
    const getData = async (uri: string) => {
        const { data } = await axios.get(uri, {
            headers: {
                'X-Master-Key': import.meta.env.VITE_NAME.replaceAll('@', '$'),
            },
        });
        return data;
    };
    const { data, error } = useSwr(URL, getData);

    return { data, error, isLoading: !error && !data };
};
