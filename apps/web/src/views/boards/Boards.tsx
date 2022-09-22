import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import { Board } from '../../components/Board';
import { useAuth } from '../../hooks'

interface Data {
    name: string;
    resume: string;
    id: string;
}

export const Boards = () => {
    const {user,isUserLoading} = useAuth();
    console.log(user);
    if(isUserLoading){
        return <h1>Loading..</h1>
    }
   
    return  (
        <>
      <Flex   mx="12">
      {user.data.folder.map((el:Data) =>(
           <Box mx="12">
             <Board name={el.name}>
                {el.name}
            </Board>
           </Box>
        ))}
      </Flex>
        </>
    )
}

