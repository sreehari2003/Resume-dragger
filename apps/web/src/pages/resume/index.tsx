/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSWRConfig } from 'swr';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { MainLoader } from '../../components/Loader';
import { useProtected, useFetch } from '../../hooks';
import { File, NewFolder } from '../../components/cards';
import { Board } from '../../components/Board';
import { Topbar } from '../../layout';
import { Boards } from '../../views/boards';
import { AxiosHandler } from '../../api';

interface Data {
    name: string;
    resume: string;
    id: string;
}

const Index = () => {
    useProtected();
    const { mutate: reload } = useSWRConfig();

    const { isLoading, data: resume, mutate } = useFetch<Data[]>('/api/resumes');

    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const toast = useToast();

    const onDrag = async (result: DropResult) => {
        if (
            result.source.droppableId === 'Resumes' &&
            result.destination?.droppableId !== 'canvas'
        ) {
            const resumeDrag = {
                folder: result.destination?.droppableId,
                resume: result.draggableId,
            };

            try {
                const { data } = await AxiosHandler.post('/api/swap', resumeDrag);
                if (!data.ok) throw new Error();
                if (data.ok) {
                    toast({
                        title: 'moved successfully',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }
                mutate();
                reload('/api/user', true);
            } catch {
                toast({
                    title: 'couldnt move the file',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }

        // if (result.destination?.droppableId !== result.draggableId) {
        //     const { data } = await AxiosHandler.post('/api/file', {
        //         file: result.destination?.droppableId,
        //         name: result.draggableId,
        //     });
        //     if (data.ok) {
        //         toast({
        //             title: 'File was moved',
        //             status: 'success',
        //             duration: 9000,
        //             isClosable: true,
        //         });
        //     } else {
        //         toast({
        //             title: data.message,
        //             status: 'error',
        //             duration: 9000,
        //             isClosable: true,
        //         });
        //     }
        // }
    };
    // const load = true;
    if (isLoading) {
        return (
            <>
                <Topbar />
                <MainLoader />
            </>
        );
    }

    return (
        <DragDropContext onDragEnd={onDrag}>
            <Topbar />
            <NewFolder isOpen={isOpen} onClose={onClose} />
            <Droppable droppableId="canvas">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Flex p="8">
                            <Board name="Resumes" draggable={false} index={-1}>
                                {resume?.data.map((el: Data, index: any) => (
                                    <File
                                        name={el.name}
                                        resume={el.resume}
                                        id={index}
                                        key={el.id}
                                    />
                                ))}
                            </Board>
                            <Boards />
                            {provided.placeholder}
                        </Flex>
                    </div>
                )}
            </Droppable>
            <Button
                alignSelf="end"
                position="fixed"
                left={{ sm: '1300', '2xl': '1700' }}
                bottom="100"
                bg="red"
                px="8"
                onClick={onOpen}
            >
                New Board
            </Button>
        </DragDropContext>
    );
};

export default Index;
