// src/presentation/pages/Dashboard.jsx
import { useState } from 'react';
import {
    Box,
    Grid,
    Heading,
    Text,
    Flex,
    Card,
    CardBody,
    Icon,
    SimpleGrid,
    Progress,
    HStack,
    Button,
    Avatar,
    Badge,
    useColorModeValue,
    Spinner,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import {
    FiDroplet,
    FiThermometer,
    FiActivity,
    FiPower,
    FiAlertCircle,
    FiCalendar,
    FiSlash,
    FiRefreshCw
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useSensors } from '../hooks/useSensors';
import { SensorCard } from '../components/dashboard/SensorCard';
import { WaterLevelCard } from '../components/dashboard/WaterLevelCard';

const Dashboard = () => {
    const { user } = useAuth();
    const [isIrrigationActive, setIsIrrigationActive] = useState(false);
    const { isLoading, error, sensorData, refreshData } = useSensors();

    // Obtener el nombre del usuario de manera segura
    const userName = user?.name || 'Usuario';

    // Función para cambiar el estado de riego
    const toggleIrrigation = () => {
        setIsIrrigationActive(!isIrrigationActive);
    };

    // Colores según el tema
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    // Función para determinar el texto de ayuda para la humedad del suelo
    const getSoilHumidityHelpText = (value) => {
        if (value < 40) return "Nivel bajo";
        if (value < 60) return "Nivel aceptable";
        return "Nivel óptimo";
    };

    // Función para determinar el texto de ayuda para el pH del agua
    const getWaterPHHelpText = (value) => {
        if (value < 6.0) return "Ácido";
        if (value > 7.2) return "Alcalino";
        return "Óptimo";
    };

    return (
        <Box p={4}>
            {/* Cabecera */}
            <Box mb={8}>
                <Flex justify="space-between" align="center">
                    <Box>
                        <Heading as="h1" size="xl" mb={2}>
                            Bienvenido a Free Garden, {userName}
                        </Heading>
                        <Text color="text.secondary">
                            Monitorea y controla tu sistema de riego automático
                        </Text>
                    </Box>
                    <Button
                        leftIcon={<FiRefreshCw />}
                        colorScheme="brand"
                        variant="ghost"
                        onClick={refreshData}
                        isLoading={isLoading}
                    >
                        Actualizar
                    </Button>
                </Flex>
            </Box>

            {/* Loading o Error */}
            {isLoading && !sensorData.environment.temperature && (
                <Flex justify="center" align="center" my={10}>
                    <Spinner size="xl" color="brand.500" thickness="4px" mr={4} />
                    <Text>Cargando datos de sensores...</Text>
                </Flex>
            )}

            {error && (
                <Alert status="error" borderRadius="md" mb={6}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            {/* Tarjetas de estadísticas */}
            {(!isLoading || sensorData.environment.temperature) && (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
                    {/* Temperatura y humedad del ambiente */}
                    <SensorCard
                        title="Temperatura ambiente"
                        value={`${sensorData.environment.temperature?.value || 0}${sensorData.environment.temperature?.unit || '°C'}`}
                        secondValue={`${sensorData.environment.humidity?.value || 0}${sensorData.environment.humidity?.unit || '%'}`}
                        secondLabel="Humedad"
                        helpText="Normal"
                        icon={FiThermometer}
                        color="orange.500"
                        progressValue={(sensorData.environment.temperature?.value / sensorData.environment.temperature?.maxValue) * 100 || 0}
                    />

                    {/* Humedad de la tierra */}
                    <SensorCard
                        title="Humedad de la tierra"
                        value={`${sensorData.soilHumidity?.value || 0}${sensorData.soilHumidity?.unit || '%'}`}
                        helpText={getSoilHumidityHelpText(sensorData.soilHumidity?.value || 0)}
                        icon={FiDroplet}
                        color="accent.500"
                        progressValue={sensorData.soilHumidity?.value || 0}
                    />

                    {/* pH del agua */}
                    <SensorCard
                        title="pH del agua"
                        value={`${sensorData.waterPH?.value || 0}`}
                        helpText={getWaterPHHelpText(sensorData.waterPH?.value || 0)}
                        icon={FiSlash}
                        color="purple.500"
                        progressValue={((sensorData.waterPH?.value - sensorData.waterPH?.minValue) /
                            (sensorData.waterPH?.maxValue - sensorData.waterPH?.minValue)) * 100 || 0}
                    />

                    {/* Nivel del agua (componente personalizado) */}
                    <WaterLevelCard data={sensorData.waterLevel} />
                </SimpleGrid>
            )}

            {/* Contenido principal */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
                {/* Panel izquierdo */}
                <Box>
                    {/* Estado del riego */}
                    <Card mb={6} bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading as="h3" size="md">
                                    Estado del riego
                                </Heading>
                                <Button
                                    colorScheme={isIrrigationActive ? "red" : "brand"}
                                    leftIcon={<Icon as={FiPower} />}
                                    onClick={toggleIrrigation}
                                >
                                    {isIrrigationActive ? "Detener" : "Activar"}
                                </Button>
                            </Flex>

                            <Text mb={4}>
                                {isIrrigationActive
                                    ? "El sistema de riego está activo. El agua está fluyendo hacia tus plantas."
                                    : "El sistema de riego está en espera. Se activará automáticamente cuando la humedad sea baja."}
                            </Text>

                            <Box mb={4}>
                                <Text fontWeight="medium" mb={1}>Estado general del sistema</Text>
                                <Progress value={90} size="sm" colorScheme="green" borderRadius="full" />
                                <Flex justify="flex-end">
                                    <Text fontSize="sm" color="text.secondary" mt={1}>90% operativo</Text>
                                </Flex>
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                                <HStack spacing={2} p={3} bg="green.50" borderRadius="md" color="green.800">
                                    <Icon as={FiDroplet} />
                                    <Text>Bomba funcionando correctamente</Text>
                                </HStack>
                                <HStack spacing={2} p={3} bg="blue.50" borderRadius="md" color="blue.800">
                                    <Icon as={FiActivity} />
                                    <Text>Sensores conectados</Text>
                                </HStack>
                            </SimpleGrid>
                        </CardBody>
                    </Card>

                    {/* Historial de riegos */}
                    <Card bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                            <Heading as="h3" size="md" mb={4}>
                                Historial de riego
                            </Heading>

                            <Box>
                                {[
                                    { date: "Hoy, 10:30 AM", duration: "5 minutos", automatic: true },
                                    { date: "Ayer, 06:15 PM", duration: "7 minutos", automatic: true },
                                    { date: "11/03/2025, 08:45 AM", duration: "10 minutos", automatic: false },
                                    { date: "10/03/2025, 07:20 PM", duration: "6 minutos", automatic: true },
                                ].map((item, idx) => (
                                    <Flex
                                        key={idx}
                                        justify="space-between"
                                        align="center"
                                        p={3}
                                        borderBottom={idx < 3 ? "1px solid" : "none"}
                                        borderColor={borderColor}
                                    >
                                        <HStack spacing={3}>
                                            <Icon as={FiCalendar} color="brand.500" />
                                            <Box>
                                                <Text fontWeight="medium">{item.date}</Text>
                                                <Text fontSize="sm" color="text.secondary">
                                                    Duración: {item.duration}
                                                </Text>
                                            </Box>
                                        </HStack>
                                        <Badge
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                            colorScheme={item.automatic ? "brand" : "gray"}
                                        >
                                            {item.automatic ? "Automático" : "Manual"}
                                        </Badge>
                                    </Flex>
                                ))}
                            </Box>
                        </CardBody>
                    </Card>
                </Box>

                {/* Panel derecho */}
                <Box>
                    {/* Alertas */}
                    <Card mb={6} bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                            <Heading as="h3" size="md" mb={4}>
                                Alertas
                            </Heading>

                            <Box>
                                <HStack
                                    p={4}
                                    bg="yellow.50"
                                    borderRadius="md"
                                    borderLeft="4px solid"
                                    borderColor="yellow.400"
                                    color="yellow.800"
                                    mb={3}
                                >
                                    <Icon as={FiAlertCircle} />
                                    <Text>La temperatura está subiendo. Considera mover las plantas a la sombra.</Text>
                                </HStack>

                                <HStack
                                    p={4}
                                    bg="blue.50"
                                    borderRadius="md"
                                    borderLeft="4px solid"
                                    borderColor="blue.400"
                                    color="blue.800"
                                >
                                    <Icon as={FiDroplet} />
                                    <Text>El nivel de agua en el depósito está por encima del 80%.</Text>
                                </HStack>
                            </Box>
                        </CardBody>
                    </Card>

                    {/* Plantas destacadas */}
                    <Card bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                            <Heading as="h3" size="md" mb={4}>
                                Plantas Destacadas
                            </Heading>

                            <Box>
                                {[
                                    { name: "Orquídea", health: "A+", location: "Sala de estar" },
                                    { name: "Ficus", health: "A", location: "Dormitorio" },
                                    { name: "Jazmín", health: "A", location: "Jardín frontal" },
                                ].map((plant, idx) => (
                                    <Flex key={idx} align="center" py={2} borderBottom={idx < 2 ? "1px solid" : "none"} borderColor={borderColor}>
                                        <Flex
                                            align="center"
                                            justify="center"
                                            bg={`${
                                                plant.health === "A+"
                                                    ? "green.500"
                                                    : plant.health === "A"
                                                        ? "brand.500"
                                                        : "orange.500"
                                            }30`}
                                            color={
                                                plant.health === "A+"
                                                    ? "green.500"
                                                    : plant.health === "A"
                                                        ? "brand.500"
                                                        : "orange.500"
                                            }
                                            borderRadius="full"
                                            p={2}
                                            boxSize="40px"
                                            mr={3}
                                            fontWeight="bold"
                                        >
                                            {plant.name.charAt(0)}
                                        </Flex>
                                        <Box flex="1">
                                            <Text fontWeight="medium">{plant.name}</Text>
                                            <Text fontSize="sm" color="text.secondary">
                                                {plant.location}
                                            </Text>
                                        </Box>
                                        <Badge
                                            px={3}
                                            py={1}
                                            colorScheme={
                                                plant.health === "A+" ? "green" : plant.health === "A" ? "blue" : "orange"
                                            }
                                            fontSize="sm"
                                            borderRadius="full"
                                        >
                                            {plant.health}
                                        </Badge>
                                    </Flex>
                                ))}
                            </Box>
                        </CardBody>
                    </Card>
                </Box>
            </Grid>
        </Box>
    );
};

export default Dashboard;