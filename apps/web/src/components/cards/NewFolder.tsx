import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Input,
    Text,
    useToast,
} from '@chakra-ui/react';

import React, { useRef, useState } from 'react';
import { AxiosHandler } from '../../api';

interface PropThin {
    isOpen: boolean;
    onClose: () => void;
}

export const NewFolder = ({ isOpen, onClose }: PropThin) => {
    const toast = useToast();
    const cancelRef = useRef(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const [err, setErr] = useState<boolean>(false);

    const handleSubmit = () => {
        if (nameRef.current && nameRef.current?.value.length < 1) {
            setErr(true);
        } else {
            setErr(false);
            // send post req to backend
            const senData = async () => {
                const { data } = await AxiosHandler.post('/api/folder', {
                    name: nameRef.current?.value,
                });
                if (data.ok) {
                    toast({
                        title: 'File created successfully',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: 'Couldnt create folder',
                        duration: 9000,
                        status: 'error',
                        isClosable: true,
                    });
                }
            };
            senData();
            onClose();
        }
    };

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        New Folder
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Input type="text" placeholder="folder name" ref={nameRef} />
                        {err && (
                            <Text color="red.500" fontWeight="bold">
                                *Please enter a folder name
                            </Text>
                        )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleSubmit} ml={3}>
                            Add
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
