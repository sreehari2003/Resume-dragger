/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import { MainLoader } from '../../components/Loader';
import { useResume, useProtected } from '../../hooks';
import { File } from '../../components/cards';
import { WithSidebar, Topbar } from '../../layout';

const Index = () => {
    useProtected();

    // fetching the resumes from provided api
    const { data, isLoading, mutate } = useResume();
    const navigate = useNavigate();
    // fetching the token from query
    const [searchParams] = useSearchParams();
    // setting the token to localStorage
    useEffect(() => {
        if (searchParams.get('id')) {
            // verifyToken();
            localStorage.setItem('token', searchParams.get('id')!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, navigate]);

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
    if (data) {
        return (
            <>
                <Topbar />
                <WithSidebar>
                    <Droppable droppableId="resume">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <Flex p="8" flexWrap="wrap" position="absolute" left="200">
                                    {data?.record.map((el, index) => (
                                        <File
                                            name={el.name}
                                            resume={el.resume}
                                            id={index}
                                            key={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </Flex>
                            </div>
                        )}
                    </Droppable>
                </WithSidebar>
            </>
        );
    }
    return (
        <>
            <Topbar />
            <WithSidebar>
                <Center
                    p="8"
                    flexWrap="wrap"
                    position="fixed"
                    alignItems="center"
                    justifyContent={{ sm: '', md: 'center' }}
                    left="100"
                    flexDirection="column"
                    w="full"
                    mt="90px"
                >
                    <Heading as="h4" fontSize="100px" color="red">
                        404
                    </Heading>
                    <Button onClick={() => mutate()} mt="40px">
                        Reload
                    </Button>
                </Center>
            </WithSidebar>
        </>
    );
};

export default Index;
