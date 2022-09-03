import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <DragDropContext onDragEnd={() => {}}>
                <App />
            </DragDropContext>
        </ChakraProvider>
    </React.StrictMode>
);
