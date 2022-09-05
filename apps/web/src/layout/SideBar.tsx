import { Box, Button, Flex, Heading, Skeleton, Text, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FcFolder } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import { useFetch } from '../hooks';
import { NewFolder } from '../components/cards';

export const SideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoading, data } = useFetch('/api/folder');

    const router = useNavigate();
    if (isLoading) {
        return (
            <Box position="fixed">
                <NewFolder isOpen={isOpen} onClose={onClose} />
                <Flex>
                    <Box>
                        <Skeleton height="100vh" width="200px" borderRadius="14px" />
                    </Box>
                </Flex>
            </Box>
        );
    }

    return (
        <Box position="fixed">
            <NewFolder isOpen={isOpen} onClose={onClose} />
            <Flex>
                <Box>
                    <Flex
                        flexDirection="column"
                        width="200px"
                        bg="blackAlpha.400"
                        height="100vh"
                        borderRadius="14px"
                        position="relative"
                        p="4"
                    >
                        <Button
                            mb="14px"
                            display="flex"
                            justifyContent="space-around"
                            onClick={onOpen}
                        >
                            new folder <AiOutlinePlus />
                        </Button>
                        <Heading as="h4" size="md" textAlign="center">
                            Folders
                        </Heading>
                        <Box overflowY="auto">
                            {data.data.map((el) => (
                                <Droppable droppableId={el.name}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <Box
                                                key={el.id}
                                                p="0px 20px"
                                                display="flex"
                                                justifyContent="space-between"
                                                mt="10px"
                                                borderRadius="12px"
                                                _hover={{ cursor: 'pointer', bg: 'grey' }}
                                                onClick={() => router(el.name)}
                                            >
                                                <FcFolder fontSize="40px" />
                                                <Text fontSize="25px">{el.name}</Text>
                                            </Box>
                                            {/* {provided.placeholder} */}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
