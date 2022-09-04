import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { SideBar } from './SideBar';

export const WithSidebar = ({ children }: { children: React.ReactNode }) => (
    <Droppable droppableId="layout">
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                <Flex position="relative">
                    <SideBar />
                    {children}
                </Flex>
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);
