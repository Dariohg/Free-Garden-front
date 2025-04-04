import { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Card,
    CardBody,
    SimpleGrid,
    Flex,
    HStack,
    VStack,
    Select,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Stack,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react';
import { FiDroplet, FiThermometer, FiSun, FiActivity } from 'react-icons/fi';

// Este componente es un placeholder para lo que sería un gráfico real
// En producción, usaríamos una librería como Chart.js o recharts
const ChartPlaceholder = ({ title, height = "300px" }) => {
    const bgPlaceholder = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');

    return (
        <Box>
            <Text fontWeight="medium" mb={2}>{title}</Text>
            <Flex
                height={height}
                bg={bgPlaceholder}
                borderRadius="md"
                justify="center"
                align="center"
                borderWidth="1px"
                borderColor={borderColor}
                flexDirection="column"
            >
                <Icon as={FiActivity} fontSize="3xl" mb={2} />
                <Text>Gráfico de {title}</Text>
                <Text fontSize="sm" mt={1} maxW="80%" textAlign="center">
                    En producción, aquí se mostraría un gráfico interactivo con datos históricos
                </Text>
            </Flex>
        </Box>
    );
};

const StatCard = ({ title, value, icon, change, period, color = "brand.500" }) => {
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Card bg={cardBg} borderColor={borderColor} boxShadow="sm">
            <CardBody>
                <Flex justify="space-between" align="center">
                    <HStack spacing={3}>
                        <Flex
                            w="40px"
                            h="40px"
                            align="center"
                            justify="center"
                            backgroundColor={`${color}20`}
                            borderRadius="lg"
                        >
                            <Icon as={icon} color={color} boxSize={5} />
                        </Flex>
                        <Box>
                            <Text color="text.secondary" fontSize="sm">{title}</Text>
                            <Text fontSize="2xl" fontWeight="bold">{value}</Text>
                        </Box>
                    </HStack>

                    {change && (
                        <Stat textAlign="right">
                            <StatHelpText mb={0}>
                                <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
                                {Math.abs(change)}% {period}
                            </StatHelpText>
                        </Stat>
                    )}
                </Flex>
            </CardBody>
        </Card>
    );
};

const Statistics = () => {
    const [period, setPeriod] = useState('month');
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    return (
        <Box p={4}>
            <Box mb={6}>
                <Heading as="h1" size="xl" mb={2}>
                    Estadísticas
                </Heading>
                <Text color="text.secondary">
                    Monitorea las tendencias y el rendimiento de tu sistema de riego
                </Text>
            </Box>

            <Flex justify="flex-end" mb={6}>
                <Select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    maxW="200px"
                    bg={cardBg}
                >
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="quarter">Último trimestre</option>
                    <option value="year">Último año</option>
                </Select>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
                <StatCard
                    title="Humedad promedio"
                    value="64%"
                    icon={FiDroplet}
                    change={2.5}
                    period={period === 'week' ? 'vs semana anterior' : period === 'month' ? 'vs mes anterior' : 'vs periodo anterior'}
                    color="accent.500"
                />
                <StatCard
                    title="Temperatura promedio"
                    value="24°C"
                    icon={FiThermometer}
                    change={-1.2}
                    period={period === 'week' ? 'vs semana anterior' : period === 'month' ? 'vs mes anterior' : 'vs periodo anterior'}
                    color="orange.500"
                />
                <StatCard
                    title="Ciclos de riego"
                    value="28"
                    icon={FiDroplet}
                    change={5}
                    period={period === 'week' ? 'vs semana anterior' : period === 'month' ? 'vs mes anterior' : 'vs periodo anterior'}
                    color="green.500"
                />
                <StatCard
                    title="Horas de luz"
                    value="148"
                    icon={FiSun}
                    change={12}
                    period={period === 'week' ? 'vs semana anterior' : period === 'month' ? 'vs mes anterior' : 'vs periodo anterior'}
                    color="yellow.500"
                />
            </SimpleGrid>

            <Card bg={cardBg} borderColor={borderColor} mb={8}>
                <CardBody>
                    <Tabs colorScheme="brand" variant="enclosed">
                        <TabList>
                            <Tab>Humedad</Tab>
                            <Tab>Temperatura</Tab>
                            <Tab>Consumo de agua</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel px={0}>
                                <ChartPlaceholder title="Niveles de Humedad" height="400px" />
                            </TabPanel>
                            <TabPanel px={0}>
                                <ChartPlaceholder title="Temperatura" height="400px" />
                            </TabPanel>
                            <TabPanel px={0}>
                                <ChartPlaceholder title="Consumo de Agua" height="400px" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                <Card bg={cardBg} borderColor={borderColor}>
                    <CardBody>
                        <Text fontWeight="medium" fontSize="lg" mb={4}>
                            Eficiencia del Sistema
                        </Text>
                        <SimpleGrid columns={2} spacing={4}>
                            <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                <VStack align="start">
                                    <Text color="text.secondary">Agua ahorrada</Text>
                                    <HStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold">32</Text>
                                        <Text>litros</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="green.500">12% más que el período anterior</Text>
                                </VStack>
                            </Box>

                            <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                <VStack align="start">
                                    <Text color="text.secondary">Riego óptimo</Text>
                                    <HStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold">85</Text>
                                        <Text>%</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="green.500">5% más que el período anterior</Text>
                                </VStack>
                            </Box>

                            <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                <VStack align="start">
                                    <Text color="text.secondary">Tiempo promedio</Text>
                                    <HStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold">6.2</Text>
                                        <Text>min</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="orange.500">2% más que el período anterior</Text>
                                </VStack>
                            </Box>

                            <Box p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                <VStack align="start">
                                    <Text color="text.secondary">Ciclos automatizados</Text>
                                    <HStack spacing={1}>
                                        <Text fontSize="2xl" fontWeight="bold">92</Text>
                                        <Text>%</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="green.500">8% más que el período anterior</Text>
                                </VStack>
                            </Box>
                        </SimpleGrid>
                    </CardBody>
                </Card>

                <Card bg={cardBg} borderColor={borderColor}>
                    <CardBody>
                        <Text fontWeight="medium" fontSize="lg" mb={4}>
                            Resumen por Sensor
                        </Text>

                        <Stack spacing={4}>
                            {['Sensor Principal', 'Sensor Secundario'].map((sensor, idx) => (
                                <Box
                                    key={idx}
                                    p={4}
                                    borderRadius="md"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                >
                                    <Flex justify="space-between" align="center" mb={3}>
                                        <Text fontWeight="medium">{sensor}</Text>
                                        <Text
                                            fontSize="sm"
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                            bg="green.50"
                                            color="green.700"
                                        >
                                            Activo
                                        </Text>
                                    </Flex>

                                    <SimpleGrid columns={2} spacing={4}>
                                        <VStack align="start">
                                            <Text fontSize="sm" color="text.secondary">Lecturas</Text>
                                            <Text fontWeight="medium">{idx === 0 ? '720' : '680'}</Text>
                                        </VStack>

                                        <VStack align="start">
                                            <Text fontSize="sm" color="text.secondary">Precisión</Text>
                                            <Text fontWeight="medium">{idx === 0 ? '98%' : '96%'}</Text>
                                        </VStack>

                                        <VStack align="start">
                                            <Text fontSize="sm" color="text.secondary">Batería</Text>
                                            <Text fontWeight="medium">{idx === 0 ? '85%' : '72%'}</Text>
                                        </VStack>

                                        <VStack align="start">
                                            <Text fontSize="sm" color="text.secondary">Señal</Text>
                                            <Text fontWeight="medium">{idx === 0 ? 'Excelente' : 'Buena'}</Text>
                                        </VStack>
                                    </SimpleGrid>
                                </Box>
                            ))}
                        </Stack>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Box>
    );
};
export default Statistics;