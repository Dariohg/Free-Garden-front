import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AppRouter from './core/router/AppRouter';
import { AuthProvider } from './presentation/contexts/AuthContext';

function App() {
    return (
        <Box height="100%">
            <Router>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </Router>
        </Box>
    );
}

export default App;