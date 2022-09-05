import useSWR from 'swr';
import { AxiosHandler } from '../api';

export interface Info {
    ok: boolean;
    message: string;
    data: any[];
}
export interface Error {
    ok: boolean;
    message: string;
}

interface ReturnVal {
    isLoading: boolean;
    data: Info;
    error: Error;
    reValidate: () => void;
}

export const useFetch = (url: string): ReturnVal => {
    const getData = async (uri: string) => {
        // here apiHandler refers to axios.create function
        const { data } = await AxiosHandler.get(uri);
        return data;
    };
    const { data, error, mutate } = useSWR(url, getData);
    const reValidate = () => {
        mutate(url);
    };

    return { data, error, isLoading: !error && !data, reValidate };
};
