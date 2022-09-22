import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Child } from '../../types';

interface ChilWithProp extends Child {
    name: string;
    draggable?: boolean;
    // id: string;
}

export const Board = ({ children, name,draggable=true }: ChilWithProp) => {

      if(!draggable){
           
        return    (
             
            <Flex
                minH="400px"
                bg="#121212"
                flexDirection="column"
                minW="280px"
                width="100%"
                p="3"
                borderRadius="12px"
            >
                <Box >
                    <Text align="center" fontSize="20px" p="3">
                        {name}
                    </Text>
                </Box>
                <Droppable droppableId="Board name">
                    {(prov) => (
                        <div ref={prov.innerRef} {...prov.droppableProps}>
                            {children}
                            {prov.placeholder}
                        </div>
                    )}
                </Droppable>
            </Flex>
       

);
      }

   
      return  (
            <Draggable draggableId={name} index={10}>
                {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Flex
                            minH="400px"
                            bg="#121212"
                            flexDirection="column"
                            minW="250px"
                            width="100%"
                            p="3"
                            borderRadius="12px"
                        >
                            <Box _hover={{ cursor: 'grabbing' }}>
                                <Text align="center" fontSize="20px" p="3">
                                    {name}
                                </Text>
                            </Box>
                            <Droppable droppableId="Board name">
                                {(prov) => (
                                    <div ref={prov.innerRef} {...prov.droppableProps}>
                                        {children}
                                        {prov.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Flex>
                    </div>
                )}
            </Draggable>
        );
}
