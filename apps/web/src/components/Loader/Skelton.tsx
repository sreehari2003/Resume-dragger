import React from 'react';
import { Skeleton } from '@chakra-ui/react';

export const Skelton = () => (
    <Skeleton
        height={{ base: '75px', md: '130px' }}
        width={{ base: '75px', md: '250px' }}
        bg="green.500"
        color="white"
        fadeDuration={1}
        borderRadius="10px"
    />
);
