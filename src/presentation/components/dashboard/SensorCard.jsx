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
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export const SensorCard = ({ title, value, secondValue, secondLabel, icon, helpText, color = "brand.500", onClick, withProgress = true, progressValue = null }) => {
    const cardBg = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

    // Si no se proporciona un valor para la barra de progreso, usamos el valor principal
    const actualProgressValue = progressValue !== null ? progressValue : parseFloat(value);

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
                <Flex justify="space-between" align="center" mb={secondValue ? 2 : 0}>
                    <Stat>
                        <StatLabel color="text.secondary">{title}</StatLabel>
                        <StatNumber fontSize="3xl">{value}</StatNumber>
                        {secondValue && (
                            <Text fontSize="lg" fontWeight="bold" color={color}>
                                {secondValue} <Text as="span" fontSize="sm" fontWeight="normal">{secondLabel}</Text>
                            </Text>
                        )}
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
                {withProgress && (
                    <Progress
                        value={actualProgressValue}
                        size="sm"
                        colorScheme={color.split('.')[0]}
                        borderRadius="full"
                        mt={2}
                    />
                )}
            </CardBody>
        </Card>
    );
};