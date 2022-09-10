import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Skeleton,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FcFolder } from 'react-icons/fc';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import { useFetch } from '../hooks';
import { NewFolder } from '../components/cards';
import { Info } from '../hooks/useFetch';

interface Data {
    name: string;
    id: string;
}

export const SideBar = () => {
    const [loaded, setLoadedData] = useState<Info<Data[]> | null>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoading, data } = useFetch<Data[]>('/api/folder');
    const params = useParams();
    const reLoad = () => {
        window.location.reload();
    };

    useEffect(() => {
        setLoadedData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const rerenderFolder = (dataState: Info) => {
        setLoadedData(dataState);
    };

    const router = useNavigate();

    if (isLoading) {
        return (
            <Box position="fixed">
                <NewFolder isOpen={isOpen} onClose={onClose} rerenderFolder={rerenderFolder} />
                <Flex>
                    <Box>
                        <Skeleton height="100vh" width="200px" borderRadius="14px" />
                    </Box>
                </Flex>
            </Box>
        );
    }

    if (data) {
        return (
            <Box position="fixed">
                <NewFolder isOpen={isOpen} onClose={onClose} rerenderFolder={rerenderFolder} />
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
                            <Link to="/resume">
                                <Heading
                                    as="h4"
                                    size="md"
                                    bg={Object.keys(params).length === 0 ? 'grey' : ''}
                                    textAlign="center"
                                    borderRadius="12px"
                                    p="9px 20px"
                                    _hover={{ cursor: 'pointer' }}
                                >
                                    All Folders
                                </Heading>
                            </Link>
                            <Box overflowY="auto">
                                {loaded?.data.map((el, index) => (
                                    <Droppable droppableId={el.name}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={index}
                                            >
                                                <Box
                                                    height="40px"
                                                    overflow="hidden"
                                                    bg={
                                                        // eslint-disable-next-line no-nested-ternary
                                                        snapshot.isDraggingOver
                                                            ? 'red'
                                                            : params.id === el.name
                                                            ? 'grey'
                                                            : ''
                                                    }
                                                    key={el.id}
                                                    p="0px 20px"
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    mt="25px"
                                                    borderRadius="12px"
                                                    _hover={{ cursor: 'pointer', bg: 'grey' }}
                                                    onClick={() => router(`/resume/${el.name}`)}
                                                >
                                                    <FcFolder fontSize="40px" />
                                                    <Text fontSize="25px">{el.name}</Text>
                                                    {provided.placeholder}
                                                </Box>
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
    }

    return (
        <Box position="fixed">
            <NewFolder isOpen={isOpen} onClose={onClose} rerenderFolder={rerenderFolder} />
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
                            <Center minH="80vh" flexDirection="column">
                                <Text
                                    color="red"
                                    fontWeight="bold"
                                    fontSize="30px"
                                    fontFamily="sans-serif"
                                >
                                    404
                                </Text>
                                <Text
                                    color="red"
                                    fontWeight="bold"
                                    fontSize="30px"
                                    fontFamily="sans-serif"
                                >
                                    Error
                                </Text>
                                <Button onClick={reLoad}>Reload</Button>
                            </Center>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
