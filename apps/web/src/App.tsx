import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Pageone from './pages';
import Resume from './pages/resume';
import Branch from './pages/resume/Branch';
import Error from './pages/404';

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
            <AuthContext>
                <Routes>
                    <Route path="/" element={<Pageone />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/resume/:id" element={<Branch />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </AuthContext>
        </BrowserRouter>
    );
};

export default App;
