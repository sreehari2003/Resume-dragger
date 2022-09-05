import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { SideBar } from './SideBar';

export const WithSidebar = ({ children }: { children: React.ReactNode }) => {
    const onDrag = (result: DropResult) => {
        console.log(result);
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
                <Droppable droppableId="resume">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {children}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Flex>
        </DragDropContext>
    );
};
