/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
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
                    <Flex minH="80vh" p="8" w="85%" flexWrap="wrap" position="absolute" left="200">
                        <Droppable droppableId="branch">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <Flex>
                                        {vars.data.map((el, index) => (
                                            // eslint-disable-next-line react/no-array-index-key
                                            <File
                                                name={el.name}
                                                resume={el.name}
                                                id={index}
                                                key={index}
                                            />
                                        ))}
                                    </Flex>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
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
