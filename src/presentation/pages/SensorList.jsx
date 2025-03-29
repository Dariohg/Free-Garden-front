// src/presentation/pages/SensorList.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Heading, Text, SimpleGrid, Card, CardBody,
    Flex, Icon, Badge, useColorModeValue
} from '@chakra-ui/react';
import { FiThermometer, FiDroplet, FiActivity, FiWifi } from 'react-icons/fi';

const SensorList = () => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    // Define los tipos de sensores disponibles
    const sensorTypes = [
        { id: 'ENV_TEMP', name: 'Temperatura Ambiente', icon: FiThermometer, color: 'orange' },
        { id: 'ENV_HUM', name: 'Humedad Ambiente', icon: FiDroplet, color: 'blue' },
        { id: 'SOIL_HUM', name: 'Humedad de la Tierra', icon: FiDroplet, color: 'green' },
        { id: 'WATER_PH', name: 'pH del Agua', icon: FiActivity, color: 'purple' },
        { id: 'WATER_LEVEL', name: 'Nivel del Depósito', icon: FiWifi, color: 'cyan' }
    ];

    const handleSelectSensor = (id) => {
        navigate(`/dashboard/sensors/${id}`);
    };

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>Sensores</Heading>
            <Text color="text.secondary" mb={6}>
                Selecciona un sensor para ver detalles y estadísticas
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {sensorTypes.map(sensor => (
                    <Card
                        key={sensor.id}
                        bg={cardBg}
                        borderColor={borderColor}
                        onClick={() => handleSelectSensor(sensor.id)}
                        cursor="pointer"
                        transition="transform 0.2s"
                        _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
                    >
                        <CardBody>
                            <Flex align="center" mb={3}>
                                <Box
                                    p={2}
                                    borderRadius="md"
                                    bg={`${sensor.color}.100`}
                                    color={`${sensor.color}.500`}
                                    mr={3}
                                >
                                    <Icon as={sensor.icon} boxSize={6} />
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">{sensor.name}</Text>
                                    <Badge colorScheme="green" mt={1}>Activo</Badge>
                                </Box>
                            </Flex>
                            <Text fontSize="sm" color="gray.500">
                                Haz clic para ver detalles y estadísticas
                            </Text>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default SensorList;