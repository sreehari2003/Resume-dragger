/* eslint-disable react/jsx-no-bind */
import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { AiFillFilePdf } from 'react-icons/ai';
import { Res } from '../../types';

interface FileRes extends Res {
    id: number;
}

export const File = ({ name, resume, id }: FileRes) => (
    <Draggable draggableId={id.toString()} index={id}>
        {(provided) => (
            <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <a href={resume} target="_blank" rel="noreferrer">
                    <Box
                        bg="black"
                        height={{ base: '110px', md: '120px' }}
                        width={{ base: '110px', md: '120px' }}
                        margin="5px"
                        borderRadius="10px"
                        _hover={{ cursor: 'grabbing', backgroundColor: 'gray' }}
                    >
                        <Flex flexDirection="column" align="center">
                            <AiFillFilePdf color="red" fontSize="80px" />
                            <Heading color="white" as="h6" fontSize="20px" textAlign="center">
                                {name}
                            </Heading>
                        </Flex>
                    </Box>
                </a>
            </Box>
        )}
    </Draggable>
);
