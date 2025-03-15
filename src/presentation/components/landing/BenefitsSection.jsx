import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Icon,
    CircularProgress,
    CircularProgressLabel,
    useColorModeValue,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Stack,
    Divider,
    Image,
} from '@chakra-ui/react';
import { FiDroplet, FiClock, FiTrendingUp } from 'react-icons/fi';
import AnimatedBox from '../common/AnimatedBox';

const BenefitStat = ({ icon, title, value, subtext, color, index }) => {
    return (
        <AnimatedBox
            animation="slideUp"
            delay={0.15 * index}
        >
            <Stat
                px={4}
                py={2}
                shadow="md"
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded="lg"
                bg={useColorModeValue('white', 'background.card')}
            >
                <Flex justifyContent="space-between" alignItems="center">
                    <Box pl={2}>
                        <StatLabel fontWeight="medium" isTruncated>
                            {title}
                        </StatLabel>
                        <StatNumber fontSize="3xl" fontWeight="bold" color={`${color}.400`}>
                            {value}
                        </StatNumber>
                        <StatHelpText>
                            {subtext}
                        </StatHelpText>
                    </Box>
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        w={16}
                        h={16}
                        bg={`${color}.50`}
                        rounded="full"
                    >
                        <Icon as={icon} w={8} h={8} color={`${color}.400`} />
                    </Flex>
                </Flex>
            </Stat>
        </AnimatedBox>
    );
};

const ProgressCircle = ({ value, label, color, delay }) => {
    const circleTrackColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <AnimatedBox animation="scale" delay={delay}>
            <Flex direction="column" align="center">
                <CircularProgress
                    value={value}
                    size="120px"
                    thickness="8px"
                    color={`${color}.400`}
                    trackColor={circleTrackColor}
                >
                    <CircularProgressLabel fontWeight="bold" fontSize="xl">
                        {value}%
                    </CircularProgressLabel>
                </CircularProgress>
                <Text mt={2} textAlign="center" fontWeight="medium">
                    {label}
                </Text>
            </Flex>
        </AnimatedBox>
    );
};

const BenefitsSection = () => {
    const sectionBg = useColorModeValue('white', 'background.primary');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    const stats = [
        {
            icon: FiDroplet,
            title: 'Ahorro de agua',
            value: '30%',
            subtext: 'menos consumo de agua',
            color: 'accent'
        },
        {
            icon: FiClock,
            title: 'Tiempo ahorrado',
            value: '5h',
            subtext: 'semanales en mantenimiento',
            color: 'brand'
        },
        {
            icon: FiTrendingUp,
            title: 'Crecimiento',
            value: '45%',
            subtext: 'mejor desarrollo de plantas',
            color: 'teal'
        },
    ];

    return (
        <Box py={20} bg={sectionBg}>
            <Container maxW="container.xl">
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
                    <Box>
                        <AnimatedBox animation="fadeIn">
                            <Text
                                color="brand.500"
                                fontWeight="bold"
                                mb={3}
                                letterSpacing="wider"
                                textTransform="uppercase"
                            >
                                Beneficios reales
                            </Text>
                            <Heading
                                as="h2"
                                size="xl"
                                mb={6}
                            >
                                Optimiza recursos y mejora la salud de tus plantas
                            </Heading>
                        </AnimatedBox>

                        <AnimatedBox animation="slideUp" delay={0.2}>
                            <Text fontSize="lg" color={textColor} mb={8}>
                                Free Garden transforma la forma en que cuidas tu jardín, proporcionando resultados
                                cuantificables que se pueden ver en tus plantas y en tus facturas de agua.
                            </Text>
                        </AnimatedBox>

                        <Stack spacing={4} mb={10}>
                            {stats.map((stat, index) => (
                                <BenefitStat
                                    key={index}
                                    icon={stat.icon}
                                    title={stat.title}
                                    value={stat.value}
                                    subtext={stat.subtext}
                                    color={stat.color}
                                    index={index}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Flex justify="center" flexWrap="wrap" gap={6}>
                            <ProgressCircle
                                value={94}
                                label="Satisfacción de usuarios"
                                color="green"
                                delay={0.2}
                            />
                            <ProgressCircle
                                value={87}
                                label="Reducción de desperdicio"
                                color="blue"
                                delay={0.4}
                            />
                            <ProgressCircle
                                value={78}
                                label="Automatización"
                                color="purple"
                                delay={0.6}
                            />
                        </Flex>

                        <Divider my={10} />

                        <AnimatedBox animation="slideUp" delay={0.8}>
                            <Box
                                p={6}
                                bg={useColorModeValue('gray.50', 'background.card')}
                                borderRadius="lg"
                                border="1px dashed"
                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                            >
                                <Heading size="md" mb={4}>
                                    <Icon as={FiDroplet} mr={2} color="brand.500" />
                                    Lo que nuestros usuarios dicen:
                                </Heading>
                                <Text fontSize="md" fontStyle="italic" mb={4}>
                                    "Desde que instalé Free Garden, mis plantas están más saludables que nunca y
                                    mi factura de agua se ha reducido significativamente. Lo mejor es que ya no
                                    tengo que preocuparme por regar cuando salgo de viaje."
                                </Text>
                                <Flex align="center">
                                    <Box
                                        w="40px"
                                        h="40px"
                                        borderRadius="full"
                                        bg="brand.100"
                                        mr={3}
                                        overflow="hidden"
                                    >
                                        <Image
                                            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY4Mzc1MzAzMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                            alt="User profile"
                                            fallbackSrc="https://via.placeholder.com/40"
                                        />
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">María G.</Text>
                                        <Text fontSize="sm" color={textColor}>Usuario de Free Garden</Text>
                                    </Box>
                                </Flex>
                            </Box>
                        </AnimatedBox>
                    </Box>
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default BenefitsSection;