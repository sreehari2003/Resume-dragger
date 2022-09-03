import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Skelton } from './Skelton';

export const MainLoader = () => (
    <Flex flexDirection="column" justifyContent="space-between" minH="100vh" p="28px">
        <Flex justifyContent="space-around">
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
        <Flex justifyContent="space-around">
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
        <Flex justifyContent="space-around">
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
        <Flex justifyContent="space-around">
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
        </Flex>
    </Flex>
);
