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
import { ApiHandler } from '../../api';

interface Data {
    name: string;
    resume: string;
    id: string;
}

const Index = () => {
    useProtected();

    const { isLoading, data: resume, mutate, error } = useFetch<Data[]>('/api/resumes');

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
    // creating instance coz jwt getting malformed
    const AxiosHandler = ApiHandler(localStorage.getItem('token')!!);

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
        // one board to anothe
        if (
            result.source.droppableId &&
            result.destination?.droppableId !== ('Resumes' || 'canvas')
        ) {
            const Data = {
                init: result.source.droppableId,
                final: result.destination?.droppableId,
                file: result.draggableId,
            };

            try {
                const { data } = await AxiosHandler.post('/api/filetofile', Data);
                setRender((el) => !el);
                if (!data.ok) throw new Error();

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
                        <Flex m="8">
                            {/* first loading is failing so */}
                            {(isLoading || error) && <MainLoader />}
                            {!isLoading && !error && (
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
