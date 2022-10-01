/* eslint-disable react/jsx-no-bind */
import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { AiFillFilePdf } from 'react-icons/ai';
import { Res } from '../../types';

interface FileRes extends Res {
    id: number;
}

export const File = ({ name, id }: FileRes) => (
    <Draggable draggableId={name} index={id}>
        {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <Box>
                    <Box
                        p="3"
                        bg="black"
                        height={{ base: '110px', md: '70px' }}
                        width="250px"
                        margin="5px"
                        borderRadius="10px"
                        _hover={{ cursor: 'grabbing', backgroundColor: 'gray' }}
                    >
                        <Flex
                            flexDirection="row-reverse"
                            align="center"
                            justifyContent="space-between"
                        >
                            <AiFillFilePdf color="red" fontSize="40px" />
                            <Heading color="white" as="h6" fontSize="20px" textAlign="center">
                                {name}
                            </Heading>
                        </Flex>
                    </Box>
                </Box>
            </div>
        )}
    </Draggable>
);
