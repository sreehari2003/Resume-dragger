/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
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

    const { isLoading, data: resume, mutate } = useFetch<Data[]>('/api/resumes');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [render, setRender] = useState<boolean>(false);

    // fetching the token from query
    const [searchParams] = useSearchParams();
    // setting the token to localStorage
    useEffect(() => {
        if (searchParams.get('id')) {
            localStorage.setItem('token', searchParams.get('id')!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const toast = useToast();

    const onDrag = async (result: DropResult) => {
        console.log(result);
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
            } catch {
                toast({
                    title: 'couldnt move the file',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }

        if (result.destination?.droppableId === 'Resumes') {
            const Info = {
                resumename: result.draggableId,
                folder: result.source.droppableId,
            };
            try {
                const { data } = await AxiosHandler.post('/api/backToResume', Info);
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
            } catch {
                toast({
                    title: 'couldnt move the file',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDrag}>
            <Topbar />
            <NewFolder isOpen={isOpen} onClose={onClose} setRender={setRender} render={render} />
            <Droppable droppableId="canvas">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Flex p="8">
                            {isLoading && <MainLoader />}
                            {!isLoading && (
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
                            )}
                            <Boards onDrag={onDrag} render={render} />
                            {provided.placeholder}
                        </Flex>
                    </div>
                )}
            </Droppable>
            <Button
                alignSelf="end"
                position="fixed"
                left={{ sm: '1300' }}
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
