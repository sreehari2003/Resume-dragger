import { Flex, useToast } from '@chakra-ui/react';
import { useSWRConfig } from 'swr';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { SideBar } from './SideBar';
import { AxiosHandler } from '../api';

export const WithSidebar = ({ children }: { children: React.ReactNode }) => {
    const toast = useToast();
    const params = useParams();
    const { mutate } = useSWRConfig();
    const onDrag = async (result: DropResult) => {
        if (result.source.droppableId === result.destination?.droppableId) {
            const swap = {
                folder: params.id,
                finalIndex: result.destination.index,
                initialIndex: result.source.index,
            };
            try {
                await AxiosHandler.post('/api/swap', swap);
                mutate(`/api/folder/${params.id}`, true);
            } catch {
                toast({
                    title: 'couldnt swap the file',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        if (result.destination?.droppableId !== result.draggableId) {
            const { data } = await AxiosHandler.post('/api/file', {
                file: result.destination?.droppableId,
                name: result.draggableId,
            });
            if (data.ok) {
                toast({
                    title: 'File was moved',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };
    return (
        <DragDropContext onDragEnd={onDrag}>
            <Flex position="relative">
                <Droppable droppableId="sidebar">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <SideBar />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {children}
            </Flex>
        </DragDropContext>
    );
};
