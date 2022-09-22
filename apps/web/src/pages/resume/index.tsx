/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { MainLoader } from '../../components/Loader';
import { useProtected, useAuth } from '../../hooks';
import { File, NewFolder } from '../../components/cards';
import { Board } from '../../components/Board';
import { Topbar } from '../../layout';
import { Boards } from '../../views/boards';

interface Data {
    name: string;
    resume: string;
    id: string;
}

const Index = () => {
    useProtected();
    const { user, isUserLoading } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log(user);

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
    const params = useParams();

    const onDrag = async (result: DropResult) => {
        console.log(result);
        // if (result.source.droppableId === result.destination?.droppableId) {
        //     const swap = {
        //         folder: params.id,
        //         finalIndex: result.destination.index,
        //         initialIndex: result.source.index,
        //     };
        //     try {
        //         await AxiosHandler.post('/api/swap', swap);
        //         mutate(`/api/folder/${params.id}`, true);
        //     } catch {
        //         toast({
        //             title: 'couldnt swap the file',
        //             status: 'error',
        //             duration: 9000,
        //             isClosable: true,
        //         });
        //     }
        // }
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
    if (isUserLoading) {
        return (
            <>
                <Topbar />
                <MainLoader />
            </>
        );
    }

    return (
        <>
            <DragDropContext onDragEnd={onDrag}>
                <Topbar />
                <NewFolder isOpen={isOpen} onClose={onClose} />
                <Droppable droppableId="canvas">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <Flex p="8">
                                <Board name="Resumes" draggable={false}>
                                    {user?.data.resume.map((el: Data) => (
                                        <File
                                            name={el.name}
                                            resume={el.resume}
                                            id={Number(el.id)}
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
                    left="1300"
                    bottom="100"
                    bg="red"
                    px="8"
                    onClick={onOpen}
                >
                    New Board
                </Button>
            </DragDropContext>
        </>
    );
};

export default Index;
