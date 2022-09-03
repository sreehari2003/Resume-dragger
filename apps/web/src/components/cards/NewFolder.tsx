import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

interface PropThin {
    isOpen: boolean;
    onClose: () => void;
}

export const NewFolder = ({ isOpen, onClose }: PropThin) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent />
    </Modal>
);
