import {
    Box,
    Grid,
    Heading,
    Text,
    Flex,
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
    SimpleGrid,
    Progress,
    HStack,
    Button,
    Avatar,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    FiDroplet,
    FiThermometer,
    FiWifi,
    FiPower,
    FiAlertCircle,
    FiCalendar
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

// Componente para las tarjetas de estado
const StatCard = ({ title, value, icon, helpText, color = "brand.500", onClick }) => {
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Card
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="sm"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
            cursor={onClick ? "pointer" : "default"}
            onClick={onClick}
        >
            <CardBody>
                <Flex justify="space-between" align="center">
                    <Stat>
                        <StatLabel color="text.secondary">{title}</StatLabel>
                        <StatNumber fontSize="3xl">{value}</StatNumber>
                        {helpText && (
                            <StatHelpText>
                                {helpText}
                            </StatHelpText>
                        )}
                    </Stat>
                    <Flex
                        w="56px"
                        h="56px"
                        align="center"
                        justify="center"
                        backgroundColor={`${color}20`}
                        borderRadius="lg"
                    >
                        <Icon as={icon} color={color} boxSize={6} />
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [isIrrigationActive, setIsIrrigationActive] = useState(false);

    // Obtener el nombre del usuario de manera segura
    const userName = user?.name || 'Usuario';

    // Función para cambiar el estado de riego
    const toggleIrrigation = () => {
        setIsIrrigationActive(!isIrrigationActive);
    };

    // Colores según el tema
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Box p={4}>
            {/* Cabecera */}
            <Box mb={8}>
                <Heading as="h1" size="xl" mb={2}>
                    Bienvenido a Free Garden, {userName}
                </Heading>
                <Text color="text.secondary">
                    Monitorea y controla tu sistema de riego automático
                </Text>
            </Box>

            {/* Tarjetas de estadísticas */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
                <StatCard
                    title="Humedad del suelo"
                    value="65%"
                    helpText="Nivel óptimo"
                    icon={FiDroplet}
                    color="accent.500"
                />
                <StatCard
                    title="Temperatura"
                    value="24°C"
                    helpText="Normal"
                    icon={FiThermometer}
                    color="orange.500"
                />
                <StatCard
                    title="Nivel de agua"
                    value="85%"
                    helpText="Depósito"
                    icon={FiDroplet}
                    color="blue.500"
                />
                <StatCard
                    title="Conectividad"
                    value="Estable"
                    helpText="Últimas 24h"
                    icon={FiWifi}
                    color="green.500"
                />
            </SimpleGrid>

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
                                    <Icon as={FiWifi} />
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
                                        <Text
                                            fontSize="sm"
                                            bg={item.automatic ? "brand.50" : "gray.100"}
                                            color={item.automatic ? "brand.700" : "gray.600"}
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                        >
                                            {item.automatic ? "Automático" : "Manual"}
                                        </Text>
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

                    {/* Plantas destacadas - usando Avatar con iniciales en lugar de imágenes */}
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