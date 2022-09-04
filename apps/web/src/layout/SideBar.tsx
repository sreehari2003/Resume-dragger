import { Box, Button, Flex, Heading, Skeleton, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { NewFolder } from '../components/cards';

export const SideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isLoading = false;

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
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
