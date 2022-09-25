import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Child } from '../../types';

export const SkeltonCard = ({ children }: Child) => (
    <Flex
        minH="100px"
        bg="#121212"
        flexDirection="column"
        justifyContent="space-between"
        px="8"
        py="1"
        borderRadius="12px"
    >
        <Box _hover={{ cursor: 'grabbing' }}>
            {/* <Text align="center" fontSize="20px" p="3">
           <Skeleton noOfLines={4}/>  
        </Text> */}
        </Box>
        {children}
    </Flex>
);
