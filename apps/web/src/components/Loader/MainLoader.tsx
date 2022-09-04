import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Skelton } from './Skelton';

export const MainLoader = () => {
    const [isLessThanMd] = useMediaQuery('(max-width: 700px)');
    return (
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
            <Flex justifyContent="space-around">
                <Skelton />
                <Skelton />
                {!isLessThanMd && (
                    <>
                        <Skelton />
                        <Skelton />
                        <Skelton />
                    </>
                )}
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
};
