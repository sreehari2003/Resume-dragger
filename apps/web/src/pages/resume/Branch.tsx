import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { MainLoader } from '../../components/Loader';
import { useProtected, useFetch } from '../../hooks';
import { File } from '../../components/cards';
import { WithSidebar, Topbar } from '../../layout';

interface Data {
    name: string;
    id: string;
}

const Branch = () => {
    useProtected();
    const params = useParams();
    // fetching the resumes from provided api

    const { data: vars, isLoading, mutate } = useFetch<Data[]>(`/api/folder/${params.id}`);

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
    if (vars) {
        return (
            <>
                <Topbar />
                <WithSidebar>
                    <Flex p="8" flexWrap="wrap" position="absolute" left="200">
                        {vars.data.map((el, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <File name={el.name} resume={el.name} id={index} key={index} />
                        ))}
                    </Flex>
                </WithSidebar>
            </>
        );
    }
    return (
        <>
            <Topbar />
            <WithSidebar>
                <Flex p="8" flexWrap="wrap" position="absolute" left="200">
                    <Heading as="h4" fontSize="100px" color="red">
                        404
                    </Heading>
                    <Button onClick={() => mutate()} mt="40px">
                        Reload
                    </Button>
                </Flex>
            </WithSidebar>
        </>
    );
};

export default Branch;
