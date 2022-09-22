import { Flex } from '@chakra-ui/react';
import React from 'react';
import{Board} from "../Board";
import { Skelton } from './Skelton';
import { SkeltonCard} from "../cards"

export const MainLoader = () => (
    <Flex
        flexDirection="row"
        justifyContent="space-between"
        minH="100vh"
        p="28px"
        flexWrap="wrap"
    
        width="100%"
    >
  
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
          <SkeltonCard >
       
            <Skelton />
            <Skelton />
            <Skelton />
          </SkeltonCard>
        </Flex>
      
      
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
          <SkeltonCard >
       
            <Skelton />
            <Skelton />
            <Skelton />
          </SkeltonCard>
        </Flex>
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
          <SkeltonCard >
       
            <Skelton />
            <Skelton />
            <Skelton />
          </SkeltonCard>
        </Flex>
        <Flex
            justifyContent="space-around"
            flexDirection={{ base: 'column', sm: 'row' }}
            flexWrap="wrap"
        >
          <SkeltonCard >
       
            <Skelton />
            <Skelton />
            <Skelton />
          </SkeltonCard>
        </Flex>
        
    </Flex>
);
