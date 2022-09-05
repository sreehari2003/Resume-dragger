import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pageone from './pages';
import Resume from './pages/resume';
import { Branch } from './pages/resume/Branch';

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
                <Route path="/resume" element={<Resume />}>
                    <Route path=":id" element={<Branch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
