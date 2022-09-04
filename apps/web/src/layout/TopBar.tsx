import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

interface Scroll {
    // eslint-disable-next-line react/require-default-props
    scrollToLogin?: () => void;
}

export const Topbar = ({ scrollToLogin }: Scroll) => {
    const [y, setY] = useState(window.screenY);

    const handleNavigation = (e: any) => {
        const window = e.currentTarget;
        setY(window.scrollY);
    };
    useEffect(() => {
        setY(window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', (e) => handleNavigation(e));

        return () => {
            // return a cleanup function to unregister our function since its gonna run multiple times
            window.removeEventListener('scroll', (e) => handleNavigation(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [y]);

    return (
        <Box display="flex" justifyContent="space-between" h={65} alignItems="center" p="6">
            <Flex flexDirection="column" position={y > 80 ? 'fixed' : 'relative'}>
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
                onClick={scrollToLogin}
            >
                Login
            </Button>
        </Box>
    );
};
