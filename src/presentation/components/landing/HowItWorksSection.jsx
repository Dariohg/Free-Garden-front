import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Flex,
    Icon,
    useColorModeValue,
    Circle,
    HStack,
    Divider,
    Image,
} from '@chakra-ui/react';
import { FiSettings, FiWifi, FiDroplet, FiSmartphone } from 'react-icons/fi';
import AnimatedBox from '../common/AnimatedBox';

const StepCard = ({ step, index }) => {
    const cardBg = useColorModeValue('white', 'background.card');
    const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.100');
    const iconColor = useColorModeValue(`${step.color}.500`, `${step.color}.400`);
    const iconBg = useColorModeValue(`${step.color}.50`, `${step.color}.900`);
    const connectingLineColor = useColorModeValue('gray.200', 'whiteAlpha.200');

    const isEven = index % 2 === 0;

    return (
        <AnimatedBox
            animation={isEven ? "slideRight" : "slideLeft"}
            delay={0.2 * index}
            position="relative"
            zIndex={1}
        >
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                borderWidth="1px"
                borderColor={cardBorder}
                _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                }}
                transition="all 0.3s ease"
            >
                <Circle
                    size="60px"
                    bg={iconBg}
                    color={iconColor}
                    border="4px solid"
                    borderColor={cardBg}
                    flexShrink={0}
                >
                    <Icon as={step.icon} fontSize="24px" />
                </Circle>
                <Box>
                    <HStack mb={2}>
                        <Circle size="24px" bg={iconColor} color="white">
                            <Text fontSize="sm" fontWeight="bold">{index + 1}</Text>
                        </Circle>
                        <Heading as="h3" size="md">
                            {step.title}
                        </Heading>
                    </HStack>
                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                        {step.description}
                    </Text>
                </Box>
            </Stack>

            {/* Connecting line between steps (except last step) */}
            {index < 3 && (
                <Box
                    display={{ base: 'none', md: 'block' }}
                    position="absolute"
                    height="40px"
                    width="2px"
                    bg={connectingLineColor}
                    left="30px"
                    bottom="-40px"
                    zIndex={0}
                ></Box>
            )}
        </AnimatedBox>
    );
};

const HowItWorksSection = () => {
    const sectionBg = useColorModeValue('gray.50', 'background.secondary');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    const steps = [
        {
            icon: FiSettings,
            title: "Instala el sistema",
            description: "Conecta los sensores de humedad y temperatura en tu jardín y configura la bomba de agua según tus necesidades.",
            color: "brand",
        },
        {
            icon: FiWifi,
            title: "Conecta a la red",
            description: "El sistema se conecta a tu red WiFi para permitir el control remoto y la recopilación de datos en tiempo real.",
            color: "blue",
        },
        {
            icon: FiDroplet,
            title: "Configura parámetros",
            description: "Establece los valores óptimos de humedad para tus plantas específicas y programa horarios de riego si lo deseas.",
            color: "cyan",
        },
        {
            icon: FiSmartphone,
            title: "Controla desde tu móvil",
            description: "Monitorea y ajusta tu sistema desde cualquier lugar a través de nuestra aplicación intuitiva.",
            color: "purple",
        },
    ];

    return (
        <Box py={20} bg={sectionBg}>
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
                            Cómo funciona
                        </Text>
                        <Heading
                            as="h2"
                            size="xl"
                            mb={4}
                        >
                            Automatiza tu jardín en simples pasos
                        </Heading>
                    </AnimatedBox>

                    <AnimatedBox animation="fadeIn" delay={0.2}>
                        <Text
                            fontSize="lg"
                            color={textColor}
                            maxW="800px"
                            mx="auto"
                        >
                            Free Garden está diseñado para ser increíblemente fácil de instalar y usar,
                            incluso si no tienes experiencia técnica.
                        </Text>
                    </AnimatedBox>
                </Box>

                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={10}
                    mb={16}
                >
                    <AnimatedBox
                        animation="slideRight"
                        flex="1"
                        maxW={{ md: '500px' }}
                    >
                        <Box
                            borderRadius="xl"
                            overflow="hidden"
                            boxShadow="xl"
                            position="relative"
                        >
                            <Image
                                src="/assets/system-diagram.png"
                                alt="Free Garden system diagram"
                                width="100%"
                                fallbackSrc="https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Free+Garden+System"
                            />

                            {/* Overlay gradient */}
                            <Box
                                position="absolute"
                                bottom="0"
                                left="0"
                                right="0"
                                height="40%"
                                bgGradient="linear(to-t, blackAlpha.600, transparent)"
                                p={6}
                                display="flex"
                                alignItems="flex-end"
                            >
                                <Text color="white" fontWeight="bold" fontSize="lg">
                                    Sistema Free Garden en acción
                                </Text>
                            </Box>
                        </Box>
                    </AnimatedBox>

                    <Stack spacing={6} flex="1">
                        <AnimatedBox animation="fadeIn" delay={0.3}>
                            <Heading size="md" mb={2}>
                                Tecnología inteligente
                            </Heading>
                            <Text color={textColor}>
                                Free Garden utiliza sensores de precisión y algoritmos inteligentes para
                                determinar exactamente cuánta agua necesitan tus plantas.
                            </Text>
                        </AnimatedBox>

                        <Divider />

                        <AnimatedBox animation="fadeIn" delay={0.4}>
                            <Heading size="md" mb={2}>
                                Adaptable a tus necesidades
                            </Heading>
                            <Text color={textColor}>
                                El sistema puede funcionar con casi cualquier configuración de jardín,
                                desde pequeñas macetas hasta grandes jardineras.
                            </Text>
                        </AnimatedBox>

                        <Divider />

                        <AnimatedBox animation="fadeIn" delay={0.5}>
                            <Heading size="md" mb={2}>
                                Expandible
                            </Heading>
                            <Text color={textColor}>
                                Comienza con un solo sensor y expande tu sistema a medida que tu jardín crece,
                                añadiendo más sensores y zonas de riego según sea necesario.
                            </Text>
                        </AnimatedBox>
                    </Stack>
                </Flex>

                <Stack spacing={10}>
                    {steps.map((step, index) => (
                        <StepCard key={index} step={step} index={index} />
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default HowItWorksSection;