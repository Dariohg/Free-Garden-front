import {
    Box,
    Flex,
    Text,
    Icon,
    Progress,
    Grid,
    HStack,
    VStack,
    Circle,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FiDroplet,
    FiThermometer,
    FiWifi,
    FiZap,
    FiSettings,
    FiPieChart,
    FiCalendar,
    FiMenu,
    FiBell,
    FiUser,
    FiHome
} from 'react-icons/fi';
import { motion } from 'framer-motion';

// Componente de panel de control
export const DashboardMockup = ({ animate = true }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const headerBg = useColorModeValue('white', 'gray.800');
    const progressTrackColor = useColorModeValue('gray.100', 'gray.600');

    // Animación para el mockup
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const ContentBox = motion(Box);

    return (
        <Box
            as={animate ? motion.div : 'div'}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
            bg={bgColor}
            maxW="600px"
            borderWidth="1px"
            borderColor={borderColor}
        >
            {/* Header */}
            <Flex
                p={3}
                bg={headerBg}
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth="1px"
                borderColor={borderColor}
            >
                <HStack spacing={3}>
                    <Icon as={FiMenu} boxSize={5} color="gray.500" />
                    <Text fontWeight="bold" fontSize="md">Free Garden</Text>
                </HStack>
                <HStack spacing={3}>
                    <Icon as={FiBell} boxSize={5} color="gray.500" />
                    <Icon as={FiUser} boxSize={5} color="gray.500" />
                </HStack>
            </Flex>

            {/* Content */}
            <Box p={4}>
                <ContentBox variants={itemVariants} mb={6}>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        Resumen del Jardín
                    </Text>
                    <Text fontSize="sm" color="gray.500" mb={4}>
                        Sistema activo · Última actualización: hace 5 min
                    </Text>
                </ContentBox>

                <ContentBox variants={itemVariants}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={6}>
                        {/* Sensor de humedad */}
                        <Box
                            p={3}
                            bg={cardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <HStack mb={2}>
                                <Circle size="30px" bg="blue.50" color="blue.500">
                                    <Icon as={FiDroplet} />
                                </Circle>
                                <Text fontWeight="medium">Humedad</Text>
                            </HStack>
                            <Text fontSize="2xl" fontWeight="bold" mb={1}>68%</Text>
                            <Progress
                                value={68}
                                size="sm"
                                colorScheme="blue"
                                borderRadius="full"
                                trackColor={progressTrackColor}
                            />
                            <Text fontSize="xs" mt={1} color="gray.500">Nivel óptimo</Text>
                        </Box>

                        {/* Sensor de temperatura */}
                        <Box
                            p={3}
                            bg={cardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <HStack mb={2}>
                                <Circle size="30px" bg="orange.50" color="orange.500">
                                    <Icon as={FiThermometer} />
                                </Circle>
                                <Text fontWeight="medium">Temperatura</Text>
                            </HStack>
                            <Text fontSize="2xl" fontWeight="bold" mb={1}>24°C</Text>
                            <Progress
                                value={60}
                                size="sm"
                                colorScheme="orange"
                                borderRadius="full"
                                trackColor={progressTrackColor}
                            />
                            <Text fontSize="xs" mt={1} color="gray.500">Normal</Text>
                        </Box>
                    </Grid>
                </ContentBox>

                <ContentBox variants={itemVariants} mb={4}>
                    <Box
                        p={4}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                        bg={cardBg}
                    >
                        <HStack mb={3} justify="space-between">
                            <Text fontWeight="bold">Estado del Riego</Text>
                            <Text fontSize="sm" color="green.500" fontWeight="bold">Activo</Text>
                        </HStack>
                        <HStack mb={4} spacing={4}>
                            <VStack align="start" spacing={0}>
                                <Text fontSize="sm" color="gray.500">Duración</Text>
                                <Text fontWeight="medium">5min</Text>
                            </VStack>
                            <VStack align="start" spacing={0}>
                                <Text fontSize="sm" color="gray.500">Próximo riego</Text>
                                <Text fontWeight="medium">Hoy, 18:00</Text>
                            </VStack>
                            <VStack align="start" spacing={0}>
                                <Text fontSize="sm" color="gray.500">Agua utilizada</Text>
                                <Text fontWeight="medium">0.8L</Text>
                            </VStack>
                        </HStack>
                        <Progress
                            value={35}
                            size="sm"
                            colorScheme="green"
                            borderRadius="full"
                            isAnimated
                            hasStripe
                            trackColor={progressTrackColor}
                        />
                    </Box>
                </ContentBox>

                {/* Bottom Navigation */}
                <ContentBox variants={itemVariants}>
                    <Flex
                        justify="space-around"
                        mt={4}
                        pt={3}
                        borderTopWidth="1px"
                        borderColor={borderColor}
                    >
                        <VStack spacing={1}>
                            <Icon as={FiHome} boxSize={5} color="brand.500" />
                            <Text fontSize="xs">Inicio</Text>
                        </VStack>
                        <VStack spacing={1}>
                            <Icon as={FiPieChart} boxSize={5} color="gray.400" />
                            <Text fontSize="xs" color="gray.400">Stats</Text>
                        </VStack>
                        <VStack spacing={1}>
                            <Icon as={FiCalendar} boxSize={5} color="gray.400" />
                            <Text fontSize="xs" color="gray.400">Calendario</Text>
                        </VStack>
                        <VStack spacing={1}>
                            <Icon as={FiSettings} boxSize={5} color="gray.400" />
                            <Text fontSize="xs" color="gray.400">Ajustes</Text>
                        </VStack>
                    </Flex>
                </ContentBox>
            </Box>
        </Box>
    );
};

// Componente de vista de sensores
export const SensorsMockup = ({ animate = true }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const headerBg = useColorModeValue('white', 'gray.800');

    // Animación para el mockup
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const ContentBox = motion(Box);

    return (
        <Box
            as={animate ? motion.div : 'div'}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
            bg={bgColor}
            maxW="350px"
            borderWidth="1px"
            borderColor={borderColor}
        >
            {/* Header */}
            <Flex
                p={3}
                bg={headerBg}
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth="1px"
                borderColor={borderColor}
            >
                <HStack spacing={3}>
                    <Icon as={FiHome} boxSize={5} color="gray.500" />
                    <Text fontWeight="bold" fontSize="md">Mis Sensores</Text>
                </HStack>
                <Icon as={FiSettings} boxSize={5} color="gray.500" />
            </Flex>

            {/* Content */}
            <Box p={4}>
                <ContentBox variants={itemVariants} mb={4}>
                    <Text fontWeight="medium" mb={3}>Sensores activos</Text>

                    <VStack spacing={3} align="stretch">
                        {/* Sensor 1 */}
                        <Box
                            p={3}
                            bg={cardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <HStack justify="space-between" mb={2}>
                                <HStack>
                                    <Circle size="30px" bg="green.50" color="green.500">
                                        <Icon as={FiWifi} />
                                    </Circle>
                                    <Text fontWeight="medium">Sensor Principal</Text>
                                </HStack>
                                <Circle size="8px" bg="green.500" />
                            </HStack>
                            <HStack justify="space-between" fontSize="sm" color="gray.500">
                                <Text>Jardín Frontal</Text>
                                <Text>Batería: 95%</Text>
                            </HStack>
                        </Box>

                        {/* Sensor 2 */}
                        <Box
                            p={3}
                            bg={cardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <HStack justify="space-between" mb={2}>
                                <HStack>
                                    <Circle size="30px" bg="blue.50" color="blue.500">
                                        <Icon as={FiWifi} />
                                    </Circle>
                                    <Text fontWeight="medium">Sensor Huerto</Text>
                                </HStack>
                                <Circle size="8px" bg="green.500" />
                            </HStack>
                            <HStack justify="space-between" fontSize="sm" color="gray.500">
                                <Text>Huerto</Text>
                                <Text>Batería: 78%</Text>
                            </HStack>
                        </Box>

                        {/* Sensor 3 */}
                        <Box
                            p={3}
                            bg={cardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <HStack justify="space-between" mb={2}>
                                <HStack>
                                    <Circle size="30px" bg="orange.50" color="orange.500">
                                        <Icon as={FiWifi} />
                                    </Circle>
                                    <Text fontWeight="medium">Sensor Terraza</Text>
                                </HStack>
                                <Circle size="8px" bg="orange.500" />
                            </HStack>
                            <HStack justify="space-between" fontSize="sm" color="gray.500">
                                <Text>Terraza</Text>
                                <Text>Batería: 32%</Text>
                            </HStack>
                        </Box>
                    </VStack>
                </ContentBox>

                <ContentBox variants={itemVariants}>
                    <Flex justify="center">
                        <Box
                            as="button"
                            py={2}
                            px={4}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="brand.500"
                            color="brand.500"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ bg: "brand.50" }}
                        >
                            + Añadir nuevo sensor
                        </Box>
                    </Flex>
                </ContentBox>
            </Box>
        </Box>
    );
};

// Componente de vista de análisis
export const AnalyticsMockup = ({ animate = true }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const chartBg = useColorModeValue('gray.50', 'gray.700');
    const headerBg = useColorModeValue('white', 'gray.800');

    // Animación para el mockup
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const ContentBox = motion(Box);

    // Datos simulados para el gráfico
    const chartPoints = [
        { x: 0, y: 60 },
        { x: 1, y: 58 },
        { x: 2, y: 62 },
        { x: 3, y: 68 },
        { x: 4, y: 72 },
        { x: 5, y: 65 },
        { x: 6, y: 64 },
    ];

    // Crear la línea del gráfico
    const chartPath = chartPoints.map((point, i) =>
        `${i === 0 ? 'M' : 'L'} ${point.x * 40} ${100 - point.y}`
    ).join(' ');

    return (
        <Box
            as={animate ? motion.div : 'div'}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
            bg={bgColor}
            maxW="450px"
            borderWidth="1px"
            borderColor={borderColor}
        >
            {/* Header */}
            <Flex
                p={3}
                bg={headerBg}
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth="1px"
                borderColor={borderColor}
            >
                <HStack spacing={3}>
                    <Icon as={FiPieChart} boxSize={5} color="gray.500" />
                    <Text fontWeight="bold" fontSize="md">Análisis</Text>
                </HStack>
                <HStack spacing={3}>
                    <Icon as={FiCalendar} boxSize={5} color="gray.500" />
                    <Text fontSize="sm">Últimos 7 días</Text>
                </HStack>
            </Flex>

            {/* Content */}
            <Box p={4}>
                <ContentBox variants={itemVariants} mb={6}>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                        Niveles de humedad
                    </Text>

                    {/* Gráfico simulado */}
                    <Box
                        h="180px"
                        w="100%"
                        bg={chartBg}
                        borderRadius="md"
                        p={4}
                        position="relative"
                        borderWidth="1px"
                        borderColor={borderColor}
                        mb={4}
                    >
                        {/* Eje Y */}
                        <Box position="absolute" left="10px" top="0" bottom="0" width="1px" height="100%" opacity={0.2} bg="gray.500" />

                        {/* Eje X */}
                        <Box position="absolute" left="0" right="0" bottom="10px" height="1px" width="100%" opacity={0.2} bg="gray.500" />

                        {/* Línea del gráfico */}
                        <Box as="svg" width="100%" height="100%" viewBox="0 0 240 100" preserveAspectRatio="none">
                            <Box
                                as="path"
                                d={chartPath}
                                fill="none"
                                stroke="brand.500"
                                strokeWidth="2"
                                opacity={0.8}
                            />

                            {/* Área bajo la curva */}
                            <Box
                                as="path"
                                d={`${chartPath} L 240 100 L 0 100 Z`}
                                fill="brand.100"
                                opacity={0.3}
                            />

                            {/* Puntos en la línea */}
                            {chartPoints.map((point, i) => (
                                <Box
                                    key={i}
                                    as="circle"
                                    cx={point.x * 40}
                                    cy={100 - point.y}
                                    r="3"
                                    fill="brand.500"
                                />
                            ))}
                        </Box>

                        {/* Etiquetas */}
                        <Flex position="absolute" bottom="0" left="0" right="0" justify="space-between" px={2}>
                            <Text fontSize="xs" color="gray.500">Lun</Text>
                            <Text fontSize="xs" color="gray.500">Mar</Text>
                            <Text fontSize="xs" color="gray.500">Mié</Text>
                            <Text fontSize="xs" color="gray.500">Jue</Text>
                            <Text fontSize="xs" color="gray.500">Vie</Text>
                            <Text fontSize="xs" color="gray.500">Sáb</Text>
                            <Text fontSize="xs" color="gray.500">Dom</Text>
                        </Flex>
                    </Box>
                </ContentBox>

                <ContentBox variants={itemVariants}>
                    <Text fontWeight="medium" mb={3}>Resumen</Text>

                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <Box
                            p={3}
                            bg={chartBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <Text fontSize="sm" color="gray.500" mb={1}>Humedad promedio</Text>
                            <Text fontSize="xl" fontWeight="bold">64.1%</Text>
                        </Box>

                        <Box
                            p={3}
                            bg={chartBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <Text fontSize="sm" color="gray.500" mb={1}>Ciclos de riego</Text>
                            <Text fontSize="xl" fontWeight="bold">12</Text>
                        </Box>

                        <Box
                            p={3}
                            bg={chartBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <Text fontSize="sm" color="gray.500" mb={1}>Agua utilizada</Text>
                            <Text fontSize="xl" fontWeight="bold">5.8L</Text>
                        </Box>

                        <Box
                            p={3}
                            bg={chartBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <Text fontSize="sm" color="gray.500" mb={1}>Ahorro estimado</Text>
                            <Text fontSize="xl" fontWeight="bold" color="green.500">32%</Text>
                        </Box>
                    </Grid>
                </ContentBox>
            </Box>
        </Box>
    );
};