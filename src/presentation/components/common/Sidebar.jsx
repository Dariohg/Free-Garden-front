import { Box, Flex, Stack, Icon, Text, VStack, Divider, HStack, useColorModeValue } from '@chakra-ui/react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiDroplet,
    FiThermometer,
    FiActivity,
    FiSettings,
    FiHelpCircle,
    FiInfo
} from 'react-icons/fi';

// Define los elementos de navegación
const navItems = [
    { name: 'Panel Principal', icon: FiHome, path: '/dashboard' },
    { name: 'Sensores', icon: FiDroplet, path: '/dashboard/sensors' },
    { name: 'Estadísticas', icon: FiActivity, path: '/dashboard/statistics' },
    { name: 'Configuración', icon: FiSettings, path: '/dashboard/settings' },
];

// Enlaces secundarios
const secondaryNavItems = [
    { name: 'Ayuda', icon: FiHelpCircle, path: '/dashboard/help' },
    { name: 'Acerca de', icon: FiInfo, path: '/dashboard/about' },
];

// Componente de un elemento de navegación
const NavItem = ({ item, onClose }) => {
    const location = useLocation();
    const isActive = location.pathname === item.path ||
        (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

    const activeBg = useColorModeValue('rgba(76, 175, 80, 0.12)', 'rgba(76, 175, 80, 0.24)');
    const hoverBg = useColorModeValue('rgba(76, 175, 80, 0.08)', 'rgba(76, 175, 80, 0.16)');
    const activeColor = useColorModeValue('brand.600', 'brand.400');
    const textColor = useColorModeValue('text.primary', 'text.dark.primary');

    const handleClick = () => {
        if (onClose) onClose();
    };

    return (
        <Box
            as={RouterLink}
            to={item.path}
            display="block"
            w="100%"
            py={2}
            px={4}
            borderRadius="md"
            color={isActive ? activeColor : textColor}
            bg={isActive ? activeBg : 'transparent'}
            _hover={{
                textDecoration: 'none',
                bg: hoverBg,
                color: isActive ? activeColor : textColor,
            }}
            onClick={handleClick}
        >
            <Flex align="center">
                <Icon as={item.icon} fontSize="lg" mr={3} />
                <Text fontSize="sm" fontWeight={isActive ? 'medium' : 'normal'}>
                    {item.name}
                </Text>
            </Flex>
        </Box>
    );
};

const Sidebar = ({ onClose }) => {
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)');

    return (
        <Box h="100%" py={2}>
            <VStack align="start" spacing={1} px={3}>
                {navItems.map((item) => (
                    <NavItem key={item.name} item={item} onClose={onClose} />
                ))}
            </VStack>

            <Divider my={4} borderColor={borderColor} />

            <VStack align="start" spacing={1} px={3}>
                {secondaryNavItems.map((item) => (
                    <NavItem key={item.name} item={item} onClose={onClose} />
                ))}
            </VStack>

            {/* Estado del sistema */}
            <Box mt={6} px={4}>
                <Text fontSize="xs" fontWeight="medium" mb={2} opacity={0.7}>
                    ESTADO DEL SISTEMA
                </Text>

                <Stack spacing={3}>
                    <Flex justify="space-between" align="center">
                        <HStack spacing={2}>
                            <Icon as={FiDroplet} color="accent.500" />
                            <Text fontSize="sm">Humedad</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="medium">65%</Text>
                    </Flex>

                    <Flex justify="space-between" align="center">
                        <HStack spacing={2}>
                            <Icon as={FiThermometer} color="orange.500" />
                            <Text fontSize="sm">Temperatura</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="medium">24°C</Text>
                    </Flex>

                    <Flex justify="space-between" align="center">
                        <HStack spacing={2}>
                            <Icon as={FiDroplet} color="blue.500" />
                            <Text fontSize="sm">Nivel de agua</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="medium">85%</Text>
                    </Flex>
                </Stack>
            </Box>
        </Box>
    );
};

export default Sidebar;