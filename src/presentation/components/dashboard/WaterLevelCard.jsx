import {
    Box,
    Flex,
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
    Progress,
    HStack,
    Text,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiDroplet } from 'react-icons/fi';

export const WaterLevelCard = ({ data }) => {
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    if (!data) return null;

    // Datos del sensor ultrasónico
    const minLevel = data.minValue; // cm
    const maxLevel = data.maxValue; // cm
    const currentLevel = data.value; // cm

    // Calculamos el porcentaje para la barra de progreso (invertido porque las lecturas ultrasónicas son inversas)
    const percentage = 100 - Math.round(((currentLevel - minLevel) / (maxLevel - minLevel)) * 100);

    return (
        <Card
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="sm"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
        >
            <CardBody>
                <Flex justify="space-between" align="center" mb={3}>
                    <Stat>
                        <StatLabel color="text.secondary">Nivel de agua</StatLabel>
                        <StatNumber fontSize="3xl">{percentage}%</StatNumber>
                        <StatHelpText>Depósito</StatHelpText>
                    </Stat>
                    <Flex
                        w="56px"
                        h="56px"
                        align="center"
                        justify="center"
                        backgroundColor="blue.100"
                        borderRadius="lg"
                    >
                        <Icon as={FiDroplet} color="blue.500" boxSize={6} />
                    </Flex>
                </Flex>

                <Progress
                    value={percentage}
                    size="sm"
                    colorScheme="blue"
                    borderRadius="full"
                    mb={3}
                />

                <HStack justify="space-between" fontSize="sm" color="gray.500">
                    <VStack align="start" spacing={0}>
                        <Text>Mínimo</Text>
                        <Text fontWeight="medium">{minLevel} cm</Text>
                    </VStack>
                    <VStack align="start" spacing={0}>
                        <Text>Actual</Text>
                        <Text fontWeight="medium">{currentLevel} cm</Text>
                    </VStack>
                    <VStack align="start" spacing={0}>
                        <Text>Máximo</Text>
                        <Text fontWeight="medium">{maxLevel} cm</Text>
                    </VStack>
                </HStack>
            </CardBody>
        </Card>
    );
};