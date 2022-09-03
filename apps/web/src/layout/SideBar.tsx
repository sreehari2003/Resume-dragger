import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Droppable } from 'react-beautiful-dnd';
import { NewFolder } from '../components/cards';

export const SideBar = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <NewFolder isOpen={isOpen} onClose={onClose} />
            <Droppable droppableId="layout">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Flex position="relative">
                            <Flex
                                flexDirection="column"
                                width="200px"
                                bg="blackAlpha.400"
                                height="100vh"
                                position="sticky"
                                borderRadius="14px"
                                p="4"
                            >
                                <Heading as="h4" size="md" textAlign="center">
                                    All Folders
                                </Heading>
                                <Button
                                    mt="14px"
                                    display="flex"
                                    justifyContent="space-around"
                                    onClick={onOpen}
                                >
                                    new folder <AiOutlinePlus />
                                </Button>
                            </Flex>
                            {children}
                        </Flex>
                    </div>
                )}
            </Droppable>
        </>
    );
};
