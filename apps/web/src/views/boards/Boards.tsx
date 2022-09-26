import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Board } from '../../components/Board';
import { File } from '../../components/cards';
import { MainLoader } from '../../components/Loader';
import { Prop } from '../../context/type';
import { useFetch } from '../../hooks';

interface Drag {
    onDrag: (el: any) => Promise<void>;
    render: boolean;
}

export const Boards = ({ onDrag, render }: Drag) => {
    const { isLoading, data: user, mutate, error } = useFetch<Prop>('/api/user');

    useEffect(() => {
        mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDrag, render]);
    if (isLoading || error) {
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
