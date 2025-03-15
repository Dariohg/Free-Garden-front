import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FiDroplet,
    FiWifi,
    FiSmartphone,
    FiClock,
    FiSun,
    FiThermometer
} from 'react-icons/fi';
import AnimatedBox from '../common/AnimatedBox';

const FeatureCard = ({ feature, index }) => {
    const cardBg = useColorModeValue('white', 'background.card');
    const cardBorder = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.05)');
    const iconBg = `${feature.color}.500`;
    const iconBgHover = `${feature.color}.600`;

    return (
        <AnimatedBox
            animation="scaleUp"
            delay={0.1 * index}
        >
            <Box
                bg={cardBg}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                borderWidth="1px"
                borderColor={cardBorder}
                height="100%"
                transition="all 0.3s ease"
                _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "lg",
                }}
            >
                <Flex
                    w="60px"
                    h="60px"
                    align="center"
                    justify="center"
                    borderRadius="lg"
                    bg={`${feature.color}.100`}
                    color={iconBg}
                    mb={4}
                    transition="all 0.3s ease"
                    _groupHover={{
                        bg: iconBg,
                        color: 'white',
                    }}
                >
                    <Icon as={feature.icon} fontSize="xl" />
                </Flex>

                <Heading size="md" mb={3} fontWeight="semibold">
                    {feature.title}
                </Heading>

                <Text color="gray.500">
                    {feature.description}
                </Text>
            </Box>
        </AnimatedBox>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            icon: FiDroplet,
            color: "brand",
            title: "Riego inteligente",
            description: "Optimiza el uso de agua con sensores de humedad que riegan solo cuando es necesario, ahorrando hasta un 30% de agua."
        },
        {
            icon: FiWifi,
            color: "accent",
            title: "Conectividad inalámbrica",
            description: "Conecta todos los componentes de tu sistema sin necesidad de cables complicados, fácil de instalar en cualquier jardín."
        },
        {
            icon: FiSmartphone,
            color: "purple",
            title: "Control desde tu móvil",
            description: "Controla todo el sistema desde tu smartphone, ajusta configuraciones y recibe notificaciones en tiempo real."
        },
        {
            icon: FiClock,
            color: "teal",
            title: "Programación automática",
            description: "Programa horarios específicos o deja que el sistema decida cuándo es el mejor momento para regar tus plantas."
        },
        {
            icon: FiThermometer,
            color: "orange",
            title: "Monitoreo de temperatura",
            description: "Sensores de temperatura te alertan cuando el clima puede afectar a tus plantas, sugiriendo acciones preventivas."
        },
        {
            icon: FiSun,
            color: "yellow",
            title: "Análisis de condiciones",
            description: "Recopila datos sobre el clima, humedad y luz para optimizar el crecimiento de tus plantas en cualquier entorno."
        },
    ];

    const sectionBg = useColorModeValue('gray.50', 'background.secondary');

    return (
        <Box py={20} bg={sectionBg}>
            <Container maxW="container.xl">
                <AnimatedBox
                    animation="fadeIn"
                    textAlign="center"
                    mb={16}
                    px={4}
                >
                    <Text
                        color="brand.500"
                        fontWeight="bold"
                        mb={3}
                        letterSpacing="wider"
                        textTransform="uppercase"
                    >
                        Características
                    </Text>
                    <Heading
                        as="h2"
                        size="xl"
                        mb={4}
                    >
                        Tecnología avanzada para tu jardín
                    </Heading>
                    <Text
                        fontSize="lg"
                        color="gray.500"
                        maxW="800px"
                        mx="auto"
                    >
                        Free Garden combina sensores inteligentes, conectividad inalámbrica y análisis de datos
                        para ofrecerte la mejor experiencia en cuidado automatizado de plantas.
                    </Text>
                </AnimatedBox>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default FeaturesSection;