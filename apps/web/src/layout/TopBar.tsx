import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AxiosHandler } from '../api';

interface Scroll {
    // eslint-disable-next-line react/require-default-props
    scrollToLogin?: () => void;
}

export const Topbar = ({ scrollToLogin }: Scroll) => {
    const location = useLocation();
    const logOut = async () => {
        localStorage.removeItem('token');
        window.location.reload();
    };
    const [y, setY] = useState(window.screenY);

    const handleNavigation = (e: any) => {
        const window = e.currentTarget;
        setY(window.scrollY);
    };
    useEffect(() => {
        setY(window.scrollY);
    }, []);

    const deleteAccount = async () => {
        await AxiosHandler.get('/api/delete');
        window.location.reload();
    };

    useEffect(() => {
        window.addEventListener('scroll', (e) => handleNavigation(e));

        return () => {
            // return a cleanup function to unregister our function since its gonna run multiple times
            window.removeEventListener('scroll', (e) => handleNavigation(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [y]);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            h={65}
            alignItems="center"
            p="6"
            position="relative"
        >
            <Flex
                flexDirection="column"
                position={y > 80 ? 'fixed' : 'relative'}
                display={y > 80 ? 'none' : 'flex'}
            >
                <Link to="/">
                    <Flex>
                        <Heading size="lg">Resume</Heading>
                        <Heading fontWeight="normal" size="lg">
                            Dragger
                        </Heading>
                    </Flex>
                </Link>
            </Flex>
            {location.pathname === '/' && (
                <Button
                    colorScheme="red
        "
                    bg="red"
                    color="white"
                    onClick={scrollToLogin}
                >
                    Login
                </Button>
            )}
            {location.pathname !== '/' && (
                <Flex>
                    <Button
                        position="fixed"
                        colorScheme="red"
                        left={{ sm: '1200' }}
                        bg="red"
                        color="white"
                        onClick={deleteAccount}
                    >
                        Delete Account
                    </Button>
                    <Button
                        position="fixed"
                        colorScheme="red"
                        left={{ sm: '1400' }}
                        bg="red"
                        color="white"
                        onClick={logOut}
                    >
                        Logout
                    </Button>
                </Flex>
            )}
        </Box>
    );
};
