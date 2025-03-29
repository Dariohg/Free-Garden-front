import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

/**
 * AuthLayout para diseño con división
 * Este layout es minimalista y solo contiene el outlet para renderizar
 * los componentes de autenticación con su propio diseño de grid
 */
const AuthLayout = () => {
    return (
        <Box
            position="relative"
            minH="100vh"
            w="full"
            overflow="hidden"
            bg="#0A0A0A"
        >
            <Outlet />
        </Box>
    );
};

export default AuthLayout;