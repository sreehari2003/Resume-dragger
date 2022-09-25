import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Board } from '../../components/Board';
import { File } from '../../components/cards';
import { MainLoader } from '../../components/Loader';
import { Prop } from '../../context/AuthContext';
import { useFetch } from '../../hooks';

export const Boards = () => {
    const { isLoading, data: user } = useFetch<Prop>('/api/user');
    if (isLoading) {
        return (
            <Flex mx="18" flexWrap="nowrap">
                <MainLoader />
            </Flex>
        );
    }

    return (
        <Flex mx="18">
            {user.data.folder.map((el, index: number) => (
                <Box mx="12">
                    <Board name={el.name} index={index}>
                        {el.File.map((file, dex) => (
                            <File name={file.name} id={dex} resume={file.name} />
                        ))}
                    </Board>
                </Box>
            ))}
        </Flex>
    );
};
