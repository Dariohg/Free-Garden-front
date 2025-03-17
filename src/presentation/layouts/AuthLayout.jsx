import { Outlet } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const AuthLayout = () => {
    return (
        <Box
            position="relative"
            minH="100vh"
            w="full"
            overflow="hidden"
            bg="#121212"
        >
            {/* Fondo con efecto de partículas interactivas */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={0}
                sx={{
                    background: 'linear-gradient(135deg, #000000 0%, #121212 100%)',
                }}
            />

            {/* Elementos decorativos animados */}
            <MotionBox
                position="absolute"
                top="10%"
                left="60%"
                width="500px"
                height="500px"
                borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
                bg="rgba(76, 175, 80, 0.05)"
                filter="blur(60px)"
                zIndex={0}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                    borderRadius: [
                        "30% 70% 70% 30% / 30% 30% 70% 70%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 70% 70% 30% / 30% 30% 70% 70%"
                    ]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <MotionBox
                position="absolute"
                bottom="5%"
                right="10%"
                width="400px"
                height="400px"
                borderRadius="60% 40% 30% 70% / 60% 30% 70% 40%"
                bg="rgba(3, 169, 244, 0.05)"
                filter="blur(60px)"
                zIndex={0}
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, -5, 0],
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%"
                    ]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            <MotionBox
                position="absolute"
                top="30%"
                left="10%"
                width="300px"
                height="300px"
                borderRadius="40% 60% 60% 40% / 40% 60% 40% 60%"
                bg="rgba(156, 39, 176, 0.03)"
                filter="blur(60px)"
                zIndex={0}
                animate={{
                    scale: [1, 0.95, 1],
                    rotate: [0, 10, 0],
                    borderRadius: [
                        "40% 60% 60% 40% / 40% 60% 40% 60%",
                        "40% 60% 70% 30% / 60% 40% 60% 40%",
                        "40% 60% 60% 40% / 40% 60% 40% 60%"
                    ]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            {/* Líneas de cuadrícula con efecto neón sutil */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage={`
          linear-gradient(to right, rgba(76, 175, 80, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(76, 175, 80, 0.03) 1px, transparent 1px)
        `}
                backgroundSize="30px 30px"
                zIndex={1}
            />

            {/* Contenido */}
            <Box
                position="relative"
                zIndex={5}
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AuthLayout;