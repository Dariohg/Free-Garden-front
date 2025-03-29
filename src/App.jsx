import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AppRouter from './core/router/AppRouter';
import { AuthProvider } from './presentation/contexts/AuthContext';
import { SensorsProvider } from './presentation/contexts/SensorsContext';

function App() {
    return (
        <Box height="100%">
            <Router>
                <AuthProvider>
                    <SensorsProvider>
                        <AppRouter />
                    </SensorsProvider>
                </AuthProvider>
            </Router>
        </Box>
    );
}

export default App;