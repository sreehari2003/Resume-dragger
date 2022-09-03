import { Box, Flex, Heading, Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

export const Topbar = () => (
    <Box display="flex" justifyContent="space-between" h={65} alignItems="center" p="6">
        <Flex flexDirection="column">
            <Link to="/">
                <Flex>
                    <Heading size="lg">Resume</Heading>
                    <Heading fontWeight="normal" size="lg">
                        Dragger
                    </Heading>
                </Flex>
            </Link>
        </Flex>
        <Button
            colorScheme="red
        "
            bg="red"
            color="white"
        >
            Login
        </Button>
    </Box>
);
