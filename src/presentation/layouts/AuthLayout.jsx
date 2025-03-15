import { Outlet } from 'react-router-dom';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

const AuthLayout = () => {
    const bgColor = useColorModeValue('background.primary', 'background.dark.primary');
    const overlayColor = useColorModeValue(
        'rgba(76, 175, 80, 0.05)',
        'rgba(76, 175, 80, 0.1)'
    );

    return (
        <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
            {/* Sección lateral con imagen decorativa (solo visible en pantallas medianas y grandes) */}
            <Box
                display={{ base: 'none', md: 'flex' }}
                flex={1}
                bg={bgColor}
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={overlayColor}
                    zIndex={1}
                />
                <Image
                    src="/assets/garden-background.jpg"
                    alt="Jardín automatizado"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    opacity={0.9}
                    fallbackSrc="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
                />
                <Flex
                    position="absolute"
                    bottom={10}
                    left={10}
                    direction="column"
                    p={6}
                    bg="rgba(255, 255, 255, 0.9)"
                    borderRadius="lg"
                    boxShadow="lg"
                    maxW="400px"
                    zIndex={2}
                >
                    <Box
                        fontSize="3xl"
                        fontWeight="bold"
                        color="brand.500"
                        mb={2}
                    >
                        Free Garden
                    </Box>
                    <Box fontSize="md" color="text.primary">
                        Sistema inteligente de riego automático para tu jardín
                    </Box>
                </Flex>
            </Box>

            {/* Sección principal con el contenido de autenticación */}
            <Flex
                flex={1}
                align="center"
                justify="center"
                bg={bgColor}
                p={8}
            >
                <Outlet />
            </Flex>
        </Flex>
    );
};

export default AuthLayout;