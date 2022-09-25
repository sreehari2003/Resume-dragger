import useSWR, { KeyedMutator } from 'swr';
import { ApiHandler } from '../api';

export interface Info<T = any> {
    ok: boolean;
    message: string;
    data: T;
}
export interface Error {
    ok: boolean;
    message: string;
}

interface ReturnVal<T = any> {
    isLoading: boolean;
    data: Info<T>;
    error: Error;
    mutate: KeyedMutator<any>;
}

export const useFetch = <T>(url: string): ReturnVal<T> => {
    const getData = async (uri: string) => {
        // here apiHandler refers to axios.create function
        const AxiosHandler = ApiHandler(localStorage.getItem('token')!!);
        const { data } = await AxiosHandler.get(uri);
        return data;
    };
    const { data, error, mutate } = useSWR(url, getData);

    return { data, error, isLoading: !error && !data, mutate };
};
