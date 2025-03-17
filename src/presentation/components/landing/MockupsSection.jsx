import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
    SimpleGrid,
    useColorModeValue,
    Button,
    Icon,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { DashboardMockup, SensorsMockup, AnalyticsMockup } from './MockupComponent';
import AnimatedBox from '../common/AnimatedBox';

const MockupsSection = () => {
    const sectionBg = useColorModeValue('gray.50', 'background.secondary');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <Box py={20} bg={sectionBg} overflow="hidden">
            <Container maxW="container.xl">
                <Box textAlign="center" mb={16}>
                    <AnimatedBox animation="fadeIn">
                        <Text
                            color="brand.500"
                            fontWeight="bold"
                            mb={3}
                            letterSpacing="wider"
                            textTransform="uppercase"
                        >
                            Interfaz Intuitiva
                        </Text>
                        <Heading
                            as="h2"
                            size="xl"
                            mb={4}
                        >
                            Monitorea tu jardín desde cualquier dispositivo
                        </Heading>
                    </AnimatedBox>

                    <AnimatedBox animation="fadeIn" delay={0.2}>
                        <Text
                            fontSize="lg"
                            color={textColor}
                            maxW="800px"
                            mx="auto"
                        >
                            Free Garden te proporciona una experiencia de usuario sencilla y potente,
                            con interfaces diseñadas para que tengas el control total de tu sistema de riego.
                        </Text>
                    </AnimatedBox>
                </Box>

                {/* Primera fila de mockups */}
                <Flex
                    justifyContent="center"
                    flexWrap={{ base: "wrap", lg: "nowrap" }}
                    gap={{ base: 8, lg: 4 }}
                    mb={{ base: 12, lg: 16 }}
                >
                    <AnimatedBox animation="slideRight" delay={0.1}>
                        <DashboardMockup animate={false} />
                    </AnimatedBox>

                    <AnimatedBox animation="slideUp" delay={0.3}>
                        <SensorsMockup animate={false} />
                    </AnimatedBox>
                </Flex>

                {/* Segunda fila de mockups */}
                <Flex
                    justifyContent="center"
                    gap={6}
                    mb={12}
                >
                    <AnimatedBox animation="slideLeft" delay={0.5}>
                        <AnalyticsMockup animate={false} />
                    </AnimatedBox>
                </Flex>

                {/* Llamada a la acción */}
                <AnimatedBox animation="fadeIn" delay={0.7} textAlign="center">
                    <Text
                        fontSize="lg"
                        fontWeight="medium"
                        mb={6}
                    >
                        Y muchas más funcionalidades para facilitarte el cuidado de tus plantas
                    </Text>

                    <Button
                        as={RouterLink}
                        to="/register"
                        size="lg"
                        colorScheme="brand"
                        rightIcon={<Icon as={FiArrowRight} />}
                        _hover={{
                            transform: 'translateY(-3px)',
                            boxShadow: 'lg',
                        }}
                    >
                        Comenzar ahora
                    </Button>
                </AnimatedBox>
            </Container>
        </Box>
    );
};

export default MockupsSection;