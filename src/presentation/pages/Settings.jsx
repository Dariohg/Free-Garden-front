// src/presentation/pages/Settings.jsx
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useToast,
    Flex,
    VStack,
    HStack,
    Icon,
    Badge,
    Avatar,
    useColorModeValue,
    Divider,
    Spinner,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { FiEdit, FiUser, FiMail, FiKey, FiShield } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
    const { user, loading } = useAuth();
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        codigo_sistema: '',
        password: '••••••••',
    });

    // Colores para el tema oscuro
    const cardBg = useColorModeValue('white', '#1A1A1A');
    const inputBg = useColorModeValue('white', '#2D2D2D');
    const inputBgDisabled = useColorModeValue('gray.100', '#1E1E1E');
    const labelColor = useColorModeValue('gray.700', 'gray.300');
    const helperTextColor = useColorModeValue('gray.500', 'gray.500');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    // Cargar datos del usuario cuando se monte el componente
    useEffect(() => {
        if (user) {
            console.log('Datos de usuario para formulario:', user);
            setFormData({
                nombre: user.first_name || user.nombre || '',
                apellido: user.last_name || user.apellido || '',
                email: user.email || '',
                codigo_sistema: user.kit_code || user.codigo_sistema || '',
                password: '••••••••',
            });
        }
    }, [user]);

    // Manejador para los cambios en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Activar modo edición
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Guardar cambios del perfil
    const handleSaveProfile = () => {
        // Aquí iría la lógica de guardado con la API cuando esté lista
        setIsEditing(false);
        toast({
            title: 'Perfil actualizado',
            description: 'Los cambios han sido guardados correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    // Cancelar edición
    const handleCancel = () => {
        // Restaurar datos originales
        if (user) {
            setFormData({
                nombre: user.name || user.nombre || '',
                apellido: user.last_name || user.apellido || '',
                email: user.email || '',
                codigo_sistema: user.system_code || user.codigo_sistema || '',
                password: '••••••••',
            });
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" h="80vh">
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text ml={4}>Cargando información del usuario...</Text>
            </Flex>
        );
    }

    if (!user) {
        return (
            <Box p={8}>
                <Alert status="warning">
                    <AlertIcon />
                    No se pudo cargar la información del usuario. Por favor, inicia sesión nuevamente.
                </Alert>
            </Box>
        );
    }

    return (
        <Box p={6}>
            <Box
                bg={cardBg}
                borderRadius="xl"
                boxShadow="lg"
                overflow="hidden"
                borderWidth="1px"
                borderColor={borderColor}
                maxW="800px"
                mx="auto"
                mt={4}
            >
                {/* Cabecera */}
                <Box
                    bg="brand.500"
                    p={6}
                    position="relative"
                    overflow="hidden"
                >
                    <Box
                        position="absolute"
                        top="-50%"
                        left="-10%"
                        width="300px"
                        height="300px"
                        borderRadius="full"
                        backgroundColor="rgba(255,255,255,0.1)"
                    />
                    <Box
                        position="absolute"
                        bottom="-30%"
                        right="-5%"
                        width="200px"
                        height="200px"
                        borderRadius="full"
                        backgroundColor="rgba(255,255,255,0.08)"
                    />

                    <Flex justify="space-between" align="center" position="relative" zIndex={2}>
                        <Flex align="center">
                            <Avatar
                                size="xl"
                                name={`${formData.nombre} ${formData.apellido}`}
                                bg="white"
                                color="brand.500"
                                fontWeight="bold"
                                boxShadow="md"
                                mr={6}
                            />
                            <Box color="white">
                                <Heading size="lg">
                                    {formData.nombre || 'Usuario'} {formData.apellido || ''}
                                </Heading>
                                <HStack mt={1} spacing={3}>
                                    <Text fontSize="sm">{formData.email}</Text>
                                    <Badge colorScheme="green">Activo</Badge>
                                </HStack>
                            </Box>
                        </Flex>

                        <Button
                            leftIcon={<FiEdit />}
                            variant="outline"
                            color="white"
                            borderColor="white"
                            onClick={handleEdit}
                            _hover={{ bg: "rgba(255,255,255,0.1)" }}
                            isDisabled={isEditing || isLoading}
                        >
                            Editar
                        </Button>
                    </Flex>
                </Box>

                {isLoading ? (
                    <Flex justify="center" align="center" minH="300px">
                        <Spinner size="xl" color="brand.500" thickness="4px" />
                        <Text ml={4}>Guardando cambios...</Text>
                    </Flex>
                ) : (
                    <VStack spacing={6} p={8} align="stretch">
                        <Text fontWeight="bold" fontSize="lg">Información Personal</Text>

                        <Flex gap={6} flexWrap="wrap">
                            <FormControl flex="1" minW="250px">
                                <FormLabel color={labelColor}>
                                    <HStack spacing={2}>
                                        <Icon as={FiUser} />
                                        <Text>Nombre</Text>
                                    </HStack>
                                </FormLabel>
                                <Input
                                    id="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    isDisabled={!isEditing}
                                    bg={isEditing ? inputBg : inputBgDisabled}
                                    _disabled={{ opacity: 0.8 }}
                                />
                            </FormControl>

                            <FormControl flex="1" minW="250px">
                                <FormLabel color={labelColor}>
                                    <HStack spacing={2}>
                                        <Icon as={FiUser} />
                                        <Text>Apellido</Text>
                                    </HStack>
                                </FormLabel>
                                <Input
                                    id="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    placeholder="Tu apellido"
                                    isDisabled={!isEditing}
                                    bg={isEditing ? inputBg : inputBgDisabled}
                                    _disabled={{ opacity: 0.8 }}
                                />
                            </FormControl>
                        </Flex>

                        <Divider />

                        <Text fontWeight="bold" fontSize="lg">Información de Contacto</Text>

                        <FormControl>
                            <FormLabel color={labelColor}>
                                <HStack spacing={2}>
                                    <Icon as={FiMail} />
                                    <Text>Correo electrónico</Text>
                                </HStack>
                            </FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@ejemplo.com"
                                isDisabled={!isEditing}
                                bg={isEditing ? inputBg : inputBgDisabled}
                                _disabled={{ opacity: 0.8 }}
                            />
                        </FormControl>

                        <Divider />

                        <Text fontWeight="bold" fontSize="lg">Información del Sistema</Text>

                        <Flex gap={6} flexWrap="wrap">
                            <FormControl flex="1" minW="250px">
                                <FormLabel color={labelColor}>
                                    <HStack spacing={2}>
                                        <Icon as={FiShield} />
                                        <Text>Código del sistema</Text>
                                    </HStack>
                                </FormLabel>
                                <Input
                                    id="codigo_sistema"
                                    value={formData.codigo_sistema}
                                    isReadOnly
                                    bg={inputBgDisabled}
                                    _disabled={{ opacity: 0.8 }}
                                    fontFamily="monospace"
                                    placeholder="Sin código asignado"
                                />
                                <Text fontSize="xs" mt={1} color={helperTextColor}>
                                    Este código es único para tu sistema Free Garden
                                </Text>
                            </FormControl>

                            <FormControl flex="1" minW="250px">
                                <FormLabel color={labelColor}>
                                    <HStack spacing={2}>
                                        <Icon as={FiKey} />
                                        <Text>Contraseña</Text>
                                    </HStack>
                                </FormLabel>
                                <Input
                                    id="password"
                                    value={formData.password}
                                    isReadOnly
                                    type="password"
                                    bg={inputBgDisabled}
                                    _disabled={{ opacity: 0.8 }}
                                />
                                <Text fontSize="xs" mt={1} color={helperTextColor}>
                                    No se puede mostrar por razones de seguridad
                                </Text>
                            </FormControl>
                        </Flex>

                        {isEditing && (
                            <Flex mt={4} justify="flex-end" gap={4}>
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    isDisabled={isLoading}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    colorScheme="brand"
                                    onClick={handleSaveProfile}
                                    isLoading={isLoading}
                                >
                                    Guardar Cambios
                                </Button>
                            </Flex>
                        )}
                    </VStack>
                )}
            </Box>
        </Box>
    );
};

export default Settings;