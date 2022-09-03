import React from 'react';
import { Flex } from '@chakra-ui/react';
import { MainLoader } from '../../components/Loader';
import { useResume } from '../../hooks';
import { File } from '../../components/cards';
import { SideBar, Topbar } from '../../layout';

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
            <SideBar>
                <Flex p="8" flexWrap="wrap">
                    {data?.record.map((el, index) => (
                        <File name={el.name} resume={el.resume} id={index} />
                    ))}
                </Flex>
            </SideBar>
        </>
    );
};

export default Index;
