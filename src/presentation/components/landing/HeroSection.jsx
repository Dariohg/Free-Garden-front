import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Flex,
    Image,
    Stack,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDroplet, FiWifi, FiThermometer } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedBox from '../common/AnimatedBox';
import React from "react";

// Para animaciones de elementos flotantes
const MotionBox = motion(Box);

const HeroSection = () => {
    // Colores adaptados al tema
    const bgGradient = useColorModeValue(
        'linear(to-b, gray.50, gray.100)',
        'linear(to-b, background.primary, background.secondary)'
    );
    const accentColor = useColorModeValue('brand.600', 'brand.400');
    const secondaryColor = useColorModeValue('accent.600', 'accent.400');

    return (
        <Box
            as="section"
            position="relative"
            bgGradient={bgGradient}
            py={{ base: 16, md: 24 }}
            overflow="hidden"
        >
            {/* Elementos decorativos animados */}
            <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex="0">
                <MotionBox
                    position="absolute"
                    top="15%"
                    left="10%"
                    width="300px"
                    height="300px"
                    borderRadius="full"
                    bg="brand.500"
                    opacity="0.07"
                    filter="blur(80px)"
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.07, 0.05, 0.07],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <MotionBox
                    position="absolute"
                    bottom="10%"
                    right="10%"
                    width="250px"
                    height="250px"
                    borderRadius="full"
                    bg="accent.500"
                    opacity="0.07"
                    filter="blur(80px)"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.07, 0.03, 0.07],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Patrón de puntos */}
                <Box
                    position="absolute"
                    top="0"
                    right="0"
                    bottom="0"
                    left="0"
                    bgImage="radial-gradient(rgba(76, 175, 80, 0.1) 1px, transparent 1px)"
                    bgSize="30px 30px"
                    opacity="0.3"
                />
            </Box>

            <Container maxW="container.xl" position="relative" zIndex="1">
                <Flex
                    direction={{ base: 'column', lg: 'row' }}
                    align="center"
                    justify="space-between"
                    gap={{ base: 10, lg: 6 }}
                >
                    {/* Contenido textual */}
                    <AnimatedBox
                        animation="slideRight"
                        flex={{ lg: 1 }}
                        maxW={{ lg: '550px' }}
                    >
                        <Box mb={6}>
                            <AnimatedBox
                                animation="fadeIn"
                                delay={0.2}
                                mb={3}
                            >
                                <Text
                                    display="inline-block"
                                    px={3}
                                    py={1}
                                    bg="brand.500"
                                    color="white"
                                    borderRadius="full"
                                    fontSize="sm"
                                    fontWeight="bold"
                                >
                                    Innovación en Riego Automático
                                </Text>
                            </AnimatedBox>

                            <AnimatedBox animation="slideUp" delay={0.3}>
                                <Heading
                                    as="h1"
                                    size={{ base: 'xl', md: '2xl', lg: '3xl' }}
                                    mb={4}
                                    lineHeight="1.2"
                                >
                                    Cultiva un{' '}
                                    <Text as="span" color={accentColor}>
                                        jardín inteligente
                                    </Text>{' '}
                                    con Free Garden
                                </Heading>
                            </AnimatedBox>

                            <AnimatedBox animation="slideUp" delay={0.4}>
                                <Text
                                    fontSize={{ base: 'lg', md: 'xl' }}
                                    opacity={0.8}
                                    mb={6}
                                    lineHeight="1.7"
                                >
                                    Sistema de riego automático que optimiza el uso de agua y
                                    mantiene tus plantas saludables, todo desde la palma de tu mano.
                                </Text>
                            </AnimatedBox>
                        </Box>

                        <AnimatedBox animation="slideUp" delay={0.5}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                spacing={4}
                                mb={8}
                            >
                                <Button
                                    as={RouterLink}
                                    to="/register"
                                    size="lg"
                                    colorScheme="brand"
                                    rightIcon={<FiArrowRight />}
                                    height="56px"
                                    px={6}
                                    _hover={{
                                        transform: 'translateY(-3px)',
                                        boxShadow: 'lg',
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    Comenzar Ahora
                                </Button>
                                <Button
                                    as={RouterLink}
                                    to="/login"
                                    size="lg"
                                    variant="outline"
                                    colorScheme="brand"
                                    height="56px"
                                    px={6}
                                    _hover={{
                                        transform: 'translateY(-3px)',
                                        boxShadow: 'md',
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    Iniciar Sesión
                                </Button>
                            </Stack>
                        </AnimatedBox>

                        <AnimatedBox animation="fadeIn" delay={0.7}>
                            <Flex
                                wrap="wrap"
                                gap={4}
                                justify={{ base: 'center', sm: 'flex-start' }}
                            >
                                {[
                                    { icon: FiDroplet, text: "Ahorra un 30% de agua" },
                                    { icon: FiWifi, text: "Control a distancia" },
                                    { icon: FiThermometer, text: "Monitoreo inteligente" },
                                ].map((item, index) => (
                                    <Flex
                                        key={index}
                                        align="center"
                                        bg="background.card"
                                        px={3}
                                        py={2}
                                        borderRadius="md"
                                        boxShadow="sm"
                                        border="1px solid"
                                        borderColor="rgba(255, 255, 255, 0.08)"
                                    >
                                        <Icon as={item.icon} color={secondaryColor} mr={2} />
                                        <Text fontSize="sm" fontWeight="medium">{item.text}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </AnimatedBox>
                    </AnimatedBox>

                    {/* Imagen/Ilustración */}
                    <AnimatedBox
                        animation="slideLeft"
                        delay={0.3}
                        flex={{ lg: 1 }}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box
                            position="relative"
                            maxW={{ base: "90%", lg: "100%" }}
                            w={{ base: "320px", md: "450px", lg: "500px" }}
                        >
                            {/* Efecto de cristal (glassmorphism) para la imagen principal */}
                            <Box
                                position="absolute"
                                top="10%"
                                right="10%"
                                bottom="10%"
                                left="10%"
                                bg="rgba(76, 175, 80, 0.12)"
                                filter="blur(40px)"
                                borderRadius="full"
                                zIndex={0}
                            />

                            <Box
                                position="relative"
                                zIndex={1}
                                transform="perspective(1000px) rotateY(-15deg)"
                                transition="transform 0.5s ease"
                                _hover={{ transform: "perspective(1000px) rotateY(0deg)" }}
                            >
                                <Image
                                    src="/assets/hero-device.png"
                                    alt="Sistema de riego Free Garden"
                                    borderRadius="xl"
                                    boxShadow="2xl"
                                    fallbackSrc="https://via.placeholder.com/500x350/4CAF50/FFFFFF?text=Free+Garden"
                                />

                                {/* Elementos flotantes alrededor de la imagen */}
                                <MotionBox
                                    position="absolute"
                                    top="-10%"
                                    right="0%"
                                    bg="background.card"
                                    p={3}
                                    borderRadius="lg"
                                    boxShadow="lg"
                                    borderWidth="1px"
                                    borderColor="rgba(255, 255, 255, 0.1)"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Flex align="center">
                                        <Icon as={FiDroplet} color="accent.500" fontSize="xl" mr={2} />
                                        <Box>
                                            <Text fontWeight="bold" fontSize="sm">Humedad Perfecta</Text>
                                            <Text fontSize="xs">65% • Óptima</Text>
                                        </Box>
                                    </Flex>
                                </MotionBox>

                                <MotionBox
                                    position="absolute"
                                    bottom="-5%"
                                    left="0%"
                                    bg="background.card"
                                    p={3}
                                    borderRadius="lg"
                                    boxShadow="lg"
                                    borderWidth="1px"
                                    borderColor="rgba(255, 255, 255, 0.1)"
                                    animate={{
                                        y: [0, 10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                >
                                    <Flex align="center">
                                        <Icon as={FiThermometer} color="orange.500" fontSize="xl" mr={2} />
                                        <Box>
                                            <Text fontWeight="bold" fontSize="sm">Temperatura</Text>
                                            <Text fontSize="xs">24°C • Normal</Text>
                                        </Box>
                                    </Flex>
                                </MotionBox>
                            </Box>
                        </Box>
                    </AnimatedBox>
                </Flex>
            </Container>
        </Box>
    );
};

export default HeroSection;