import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Stack,
    Flex,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBox from '../common/AnimatedBox';

// Motion box para animaciones
const MotionBox = motion(Box);

const CtaSection = () => {
    const sectionBg = useColorModeValue('gray.50', 'background.secondary');
    const cardBg = useColorModeValue('white', 'background.card');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const headingColor = useColorModeValue('brand.600', 'brand.400');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <Box py={20} bg={sectionBg} position="relative" overflow="hidden">
            {/* Elementos decorativos */}
            <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex="0">
                <MotionBox
                    position="absolute"
                    top="20%"
                    right="5%"
                    width="300px"
                    height="300px"
                    borderRadius="full"
                    bg="brand.500"
                    opacity="0.07"
                    filter="blur(70px)"
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.07, 0.05, 0.07],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <MotionBox
                    position="absolute"
                    bottom="10%"
                    left="5%"
                    width="200px"
                    height="200px"
                    borderRadius="full"
                    bg="accent.500"
                    opacity="0.05"
                    filter="blur(60px)"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.05, 0.07, 0.05],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </Box>

            <Container maxW="container.xl" position="relative" zIndex="1">
                <AnimatedBox animation="scale">
                    <Box
                        p={{ base: 8, md: 12 }}
                        borderRadius="2xl"
                        boxShadow="xl"
                        bg={cardBg}
                        borderWidth="1px"
                        borderColor={borderColor}
                        position="relative"
                        overflow="hidden"
                    >
                        {/* Efecto de línea brillante en el borde */}
                        <Box
                            position="absolute"
                            top="-2px"
                            left="-2px"
                            right="-2px"
                            bottom="-2px"
                            opacity="0.5"
                            borderRadius="2xl"
                            borderWidth="2px"
                            borderColor="transparent"
                            bgGradient="linear(to-r, brand.500, accent.500)"
                            zIndex={0}
                            pointerEvents="none"
                        ></Box>

                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            align="center"
                            justify="space-between"
                            position="relative"
                            zIndex={1}
                            gap={8}
                        >
                            <Stack spacing={4} textAlign={{ base: 'center', md: 'left' }}>
                                <Heading as="h2" size="xl" color={headingColor}>
                                    Comienza a automatizar tu jardín hoy
                                </Heading>
                                <Text fontSize="lg" color={textColor} maxW="700px">
                                    Únete a miles de usuarios satisfechos que han transformado la forma
                                    en que cuidan sus plantas. Free Garden te ofrece tecnología avanzada
                                    con una instalación sencilla y resultados inmediatos.
                                </Text>
                            </Stack>

                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                spacing={4}
                                width={{ base: '100%', md: 'auto' }}
                            >
                                <Button
                                    as={RouterLink}
                                    to="/register"
                                    size="lg"
                                    colorScheme="brand"
                                    rightIcon={<Icon as={FiArrowRight} />}
                                    height="56px"
                                    px={8}
                                    _hover={{
                                        transform: 'translateY(-3px)',
                                        boxShadow: 'lg',
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    Comenzar ahora
                                </Button>
                                <Button
                                    as={RouterLink}
                                    to="/login"
                                    size="lg"
                                    variant="outline"
                                    colorScheme="brand"
                                    height="56px"
                                    px={8}
                                    _hover={{
                                        transform: 'translateY(-3px)',
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    Iniciar sesión
                                </Button>
                            </Stack>
                        </Flex>
                    </Box>
                </AnimatedBox>
            </Container>
        </Box>
    );
};

export default CtaSection;