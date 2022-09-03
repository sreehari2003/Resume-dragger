import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pageone from './pages';
import Resume from './pages/resume';

const App = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        if (colorMode === 'light') {
            toggleColorMode();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorMode]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Pageone />} />
                <Route path="/resume" element={<Resume />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
