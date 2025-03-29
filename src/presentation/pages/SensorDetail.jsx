import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    Text,
    Stack,
    Flex,
    IconButton,
    Progress,
    HStack,
    VStack,
    Badge,
    Divider,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Spinner,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { FiArrowLeft, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { useSensors } from '../hooks/useSensors';

const SensorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { sensorData, isLoading, error, refreshData, getSensorHistory } = useSensors();
    const [sensor, setSensor] = useState(null);
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState(null);

    const bgColor = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    // Función para formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Identificar el sensor correcto basado en el ID
    useEffect(() => {
        if (!isLoading && sensorData) {
            let foundSensor = null;

            if (id === 'ENV_TEMP') foundSensor = sensorData.environment.temperature;
            else if (id === 'ENV_HUM') foundSensor = sensorData.environment.humidity;
            else if (id === 'SOIL_HUM') foundSensor = sensorData.soilHumidity;
            else if (id === 'WATER_PH') foundSensor = sensorData.waterPH;
            else if (id === 'WATER_LEVEL') foundSensor = sensorData.waterLevel;

            setSensor(foundSensor);

            // Cargar el historial
            if (foundSensor) {
                setLoadingHistory(true);
                getSensorHistory(id)
                    .then(history => {
                        setHistory(history);
                        setHistoryError(null);
                    })
                    .catch(err => {
                        console.error('Error loading sensor history:', err);
                        setHistoryError('No se pudo cargar el historial del sensor');
                    })
                    .finally(() => {
                        setLoadingHistory(false);
                    });
            }
        }
    }, [id, isLoading, sensorData, getSensorHistory]);

    // Obtener el color según el valor para gráficos
    const getSensorColor = (type, value) => {
        if (type === 'temperature') {
            if (value < 15) return "blue.500";
            if (value < 22) return "green.500";
            if (value < 28) return "yellow.500";
            return "orange.500";
        } else if (type === 'humidity' || type === 'soil_humidity') {
            if (value < 40) return "orange.500";
            if (value < 60) return "yellow.500";
            if (value < 80) return "green.500";
            return "blue.500";
        } else if (type === 'ph') {
            if (value < 6.0) return "purple.300";
            if (value > 7.2) return "purple.600";
            return "green.500";
        }

        return "gray.500";
    };

    if (isLoading && !sensor) {
        return (
            <Box p={4} textAlign="center">
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text mt={4}>Cargando información del sensor...</Text>
            </Box>
        );
    }

    if (error || !sensor) {
        return (
            <Box p={4}>
                <Button leftIcon={<FiArrowLeft />} onClick={() => navigate('/dashboard')} mb={4}>
                    Volver
                </Button>
                <Card bg={bgColor} borderColor={borderColor}>
                    <CardBody>
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            {error || 'Sensor no encontrado'}
                        </Alert>
                    </CardBody>
                </Card>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Flex align="center" justify="space-between" mb={6}>
                <Flex align="center">
                    <IconButton
                        icon={<FiArrowLeft />}
                        aria-label="Volver"
                        mr={4}
                        onClick={() => navigate('/dashboard/sensors')}
                    />
                    <Heading as="h1" size="lg">
                        {sensor.type === 'temperature' && 'Temperatura Ambiente'}
                        {sensor.type === 'humidity' && 'Humedad Ambiente'}
                        {sensor.type === 'soil_humidity' && 'Humedad de la Tierra'}
                        {sensor.type === 'ph' && 'pH del Agua'}
                        {sensor.type === 'water_level' && 'Nivel del Depósito'}
                    </Heading>
                </Flex>
                <Button
                    leftIcon={<FiRefreshCw />}
                    variant="outline"
                    colorScheme="brand"
                    size="sm"
                    onClick={refreshData}
                >
                    Actualizar
                </Button>
            </Flex>

            <Stack spacing={6}>
                {/* Información general del sensor */}
                <Card bg={bgColor} borderColor={borderColor}>
                    <CardBody>
                        <Flex flexDirection={{ base: "column", md: "row" }} gap={6}>
                            <Box flex={1}>
                                <Text fontWeight="medium" fontSize="lg" mb={4}>
                                    Información del Sensor
                                </Text>
                                <VStack align="start" spacing={3}>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Tipo:</Text>
                                        <Text fontWeight="medium">{sensor.type}</Text>
                                    </Flex>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Unidad:</Text>
                                        <Text fontWeight="medium">{sensor.unit}</Text>
                                    </Flex>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Estado:</Text>
                                        <Badge colorScheme={sensor.status === 'active' ? 'green' : 'red'}>
                                            {sensor.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </Flex>
                                    <Flex justify="space-between" w="full">
                                        <Text color="text.secondary">Última lectura:</Text>
                                        <Text fontWeight="medium">{formatDate(sensor.timestamp)}</Text>
                                    </Flex>
                                </VStack>
                            </Box>

                            <Divider orientation='vertical' />

                            <Box flex={1}>
                                <Text fontWeight="medium" fontSize="lg" mb={4}>
                                    Estado actual
                                </Text>

                                <Stack spacing={4}>
                                    <Box>
                                        <Flex justify="space-between" mb={1}>
                                            <HStack>
                                                <FiActivity />
                                                <Text>Valor</Text>
                                            </HStack>
                                            <Text
                                                fontWeight="medium"
                                                color={getSensorColor(sensor.type, sensor.value)}
                                            >
                                                {sensor.value}{sensor.unit}
                                            </Text>
                                        </Flex>
                                        <Progress
                                            value={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                                            size="sm"
                                            colorScheme={getSensorColor(sensor.type, sensor.value).split('.')[0]}
                                            borderRadius="full"
                                        />
                                    </Box>

                                    <Box>
                                        <Flex justify="space-between" mb={1}>
                                            <Text>Rango</Text>
                                            <Text fontWeight="medium">{sensor.minValue}{sensor.unit} - {sensor.maxValue}{sensor.unit}</Text>
                                        </Flex>
                                    </Box>
                                </Stack>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>

                {/* Historial del sensor */}
                <Card bg={bgColor} borderColor={borderColor}>
                    <CardBody>
                        <Flex justify="space-between" align="center" mb={4}>
                            <Text fontWeight="medium" fontSize="lg">
                                Historial de lecturas
                            </Text>
                        </Flex>

                        {loadingHistory ? (
                            <Box textAlign="center" py={4}>
                                <Spinner size="md" color="brand.500" />
                                <Text mt={2}>Cargando historial...</Text>
                            </Box>
                        ) : historyError ? (
                            <Alert status="error" mb={4} borderRadius="md">
                                <AlertIcon />
                                {historyError}
                            </Alert>
                        ) : history.length === 0 ? (
                            <Text textAlign="center" py={4} color="text.secondary">
                                No hay datos históricos disponibles
                            </Text>
                        ) : (
                            <Stack spacing={4}>
                                {history.map((reading, index) => (
                                    <Box
                                        key={index}
                                        p={4}
                                        borderRadius="md"
                                        borderWidth="1px"
                                        borderColor={borderColor}
                                    >
                                        <Flex justify="space-between" align="center" mb={2}>
                                            <Text fontWeight="medium">{formatDate(reading.timestamp)}</Text>
                                        </Flex>
                                        <Flex gap={6}>
                                            <Stat>
                                                <StatLabel>{
                                                    sensor.type === 'temperature' ? 'Temperatura' :
                                                        sensor.type === 'humidity' ? 'Humedad' :
                                                            sensor.type === 'soil_humidity' ? 'Humedad de Tierra' :
                                                                sensor.type === 'ph' ? 'pH' : 'Nivel'
                                                }</StatLabel>
                                                <StatNumber>
                                                    {reading.value}{sensor.unit}
                                                </StatNumber>
                                            </Stat>
                                        </Flex>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    );
};

export default SensorDetail;