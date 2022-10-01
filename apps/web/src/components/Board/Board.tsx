import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Child } from '../../types';

interface ChilWithProp extends Child {
    name: string;
    // eslint-disable-next-line react/require-default-props
    draggable?: boolean;
    index: number;
    // eslint-disable-next-line react/require-default-props
}

export const Board = ({ children, index, name, draggable = true }: ChilWithProp) => {
    if (!draggable) {
        return (
            <Flex
                minH="400px"
                bg="#121212"
                flexDirection="column"
                minW="280px"
                p="3"
                borderRadius="12px"
            >
                <Box>
                    <Text align="center" fontSize="20px" p="3">
                        {name}
                    </Text>
                </Box>
                <Droppable droppableId={name}>
                    {(prov, snapshot) => (
                        <Box
                            ref={prov.innerRef}
                            {...prov.droppableProps}
                            border={snapshot.isDraggingOver ? '1px solid red' : ''}
                            borderRadius="12px"
                        >
                            {children}
                            {prov.placeholder}
                        </Box>
                    )}
                </Droppable>
            </Flex>
        );
    }

    return (
        <Draggable draggableId={name} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Flex
                        bg="#121212"
                        flexDirection="column"
                        minW="250px"
                        width="100%"
                        p="3"
                        borderRadius="12px"
                    >
                        <Box _hover={{ cursor: 'grabbing' }}>
                            <Text align="center" fontSize="20px" p="3">
                                {name}
                            </Text>
                        </Box>
                        <Droppable droppableId={name}>
                            {(prov, snapshot) => (
                                <div ref={prov.innerRef} {...prov.droppableProps}>
                                    <Box
                                        minH="300px"
                                        border={snapshot.isDraggingOver ? '2px solid red' : ''}
                                        borderRadius="12px"
                                    >
                                        {children}
                                        {prov.placeholder}
                                    </Box>
                                </div>
                            )}
                        </Droppable>
                    </Flex>
                </div>
            )}
        </Draggable>
    );
};
