import { Box, Button, Flex, Heading, List, ListIcon, ListItem, useToast } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import { AiFillCheckCircle, AiFillGoogleCircle } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Topbar } from '../layout';

const Index = () => {
    const toast = useToast();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            navigate('/resume');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const LoginRef = useRef<HTMLDivElement>(null);
    const scrollToLogin = () => LoginRef.current?.scrollIntoView();
    const Login = () => {
        // window.open('http://localhost:8080/auth/google/', '_self');
        window.open('https://resume-dragger-production.up.railway.app/auth/google', '_self');
    };

    useEffect(() => {
        const authStatus = searchParams.get('fail');
        if (authStatus === 'true') {
            toast({
                title: 'Login Failed',
                description: 'Login with google failed please try again later',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <>
            <Topbar scrollToLogin={scrollToLogin} />
            <Box p="29px">
                <Flex justifyContent="space-around" flexDirection={{ base: 'column', md: 'row' }}>
                    <Box
                        w={{ sm: 'full', md: '47%' }}
                        bg="white"
                        minH="85vh"
                        borderRadius="14px"
                        p="10"
                    >
                        <Heading color="black" fontSize="60px" textAlign="center">
                            Dragger
                        </Heading>
                        <Box mt="90px" color="black" fontSize="19px" fontFamily="sans-serif" p="8">
                            <Heading color="gray" mb="30px">
                                What We Offer
                            </Heading>
                            <List spacing={3}>
                                <ListItem>
                                    <ListIcon as={AiFillCheckCircle} color="green.500" />
                                    Create Folders
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={AiFillCheckCircle} color="green.500" />
                                    Classify Folders
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={AiFillCheckCircle} color="green.500" />
                                    Drag and Drop Support
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={AiFillCheckCircle} color="green.500" />
                                    Database support
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={AiFillCheckCircle} color="green.500" />
                                    Login With Google
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                    <Flex
                        w={{ sm: 'full', md: '47%' }}
                        bg="black"
                        h="85vh"
                        borderRadius="14px"
                        marginTop={{ base: '20px', md: '0px' }}
                        ref={LoginRef}
                        p="20"
                        flexDirection="column"
                    >
                        <Heading
                            color="white"
                            fontSize={{ base: '40px', md: '60px' }}
                            textAlign="center"
                        >
                            Login/Signup
                        </Heading>
                        <Button
                            mt="90px"
                            leftIcon={<AiFillGoogleCircle />}
                            colorScheme="red"
                            variant="solid"
                            alignSelf="center"
                            p="12px 18px"
                            bg="red"
                            onClick={Login}
                            color="white"
                        >
                            Continue With Google
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};
export default Index;
