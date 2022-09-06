import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Skelton } from './Skelton';

export const MainLoader = () => (
    <Flex
        flexDirection="column"
        justifyContent="space-between"
        minH="100vh"
        p="28px"
        flexWrap="wrap"
        position="absolute"
        left="200"
        width="85%"
    >
        <Flex
            justifyContent="space-between"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
    </Flex>
);
