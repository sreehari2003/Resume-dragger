/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { AxiosHandler } from '../../api/index';
import { MainLoader } from '../../components/Loader';
import { useResume, Protected } from '../../hooks';
import { File } from '../../components/cards';
import { WithSidebar, Topbar } from '../../layout';

const Index = () => {
    Protected();
    // fetching the resumes from provided api
    const { data, isLoading } = useResume();
    // fetching the token from query
    const [searchParams] = useSearchParams();
    useEffect(() => {
        (async () => {
            AxiosHandler.get(`/user}`);
        })();
    }, []);

    // setting the token to localStorage
    useEffect(() => {
        if (searchParams.get('id')) {
            localStorage.setItem('token', searchParams.get('id')!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    if (isLoading) {
        return (
            <>
                <Topbar />
                <WithSidebar>
                    <MainLoader />
                </WithSidebar>
            </>
        );
    }
    return (
        <>
            <Topbar />
            <WithSidebar>
                <Flex p="8" flexWrap="wrap" position="absolute" left="200">
                    {data?.record.map((el, index) => (
                        <File name={el.name} resume={el.resume} id={index} key={index} />
                    ))}
                </Flex>
            </WithSidebar>
        </>
    );
};

export default Index;
