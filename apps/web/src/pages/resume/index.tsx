/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Flex } from '@chakra-ui/react';
import { MainLoader } from '../../components/Loader';
import { useResume } from '../../hooks';
import { File } from '../../components/cards';
import { WithSidebar, Topbar } from '../../layout';

const Index = () => {
    const { data, isLoading } = useResume();

    if (isLoading) {
        return (
            <>
                <Topbar />
                <MainLoader />
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
