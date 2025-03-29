import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Text,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
    Alert,
    AlertIcon,
    Link,
    VStack,
    Grid,
    GridItem,
    Image,
    SimpleGrid,
    IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const { register } = useAuth();

    // Manejador para los cambios en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Validar el formulario
    const validateForm = () => {
        const errors = {};

        if (!formData.nombre) {
            errors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido) {
            errors.apellido = 'El apellido es requerido';
        }

        if (!formData.email) {
            errors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'El correo electrónico no es válido';
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            // Preparar los datos para el registro
            const userData = {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                password: formData.password,
            };

            // Llamar a la función register
            const result = await register(userData);

            if (result.success) {
                // Redireccionar al login
                navigate('/login');
            } else {
                setError(result.message || 'Error al registrar. Intenta de nuevo.');
            }
        } catch (error) {
            setError('Ocurrió un error durante el registro');
            console.error('Register error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para volver
    const handleBackToLogin = () => {
        navigate('/');
    };

    return (
        <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            minH="100vh"
            width="100%"
        >
            {/* Sección izquierda - Imagen del jardín */}
            <GridItem
                display={{ base: "none", md: "flex" }}
                position="relative"
                overflow="hidden"
            >
                <Image
                    src="https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1974&auto=format&fit=crop"
                    alt="Jardín con sistema de riego"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                />

                {/* Overlay para mejorar visibilidad del texto */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.3)"
                />

                {/* Logo y texto */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    textAlign="center"
                    bg="rgba(255, 255, 255, 0.85)"
                    p={8}
                    borderRadius="md"
                    width="80%"
                    maxW="300px"
                >
                    <Text
                        color="#4CAF50"
                        fontSize="3xl"
                        fontWeight="bold"
                        mb={2}
                    >
                        Free Garden
                    </Text>
                    <Text color="#333" fontSize="md">
                        Optimiza el riego de tu jardín con tecnología inteligente
                    </Text>
                </Box>
            </GridItem>

            {/* Sección derecha - Formulario de registro */}
            <GridItem
                bg="#121212"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={4}
                order={{ base: 1, md: 2 }}
                position="relative"
            >
                {/* Botón para volver al login */}
                <IconButton
                    position="absolute"
                    top={4}
                    left={4}
                    aria-label="Volver a iniciar sesión"
                    icon={<FiArrowLeft />}
                    variant="ghost"
                    color="gray.500"
                    _hover={{ color: "white" }}
                    onClick={handleBackToLogin}
                    size="md"
                />

                <Box
                    w="100%"
                    maxW="450px"
                    mx="auto"
                    mt={12}
                >
                    <VStack spacing={6} align="stretch">
                        {/* Encabezado */}
                        <Box textAlign="center">
                            <Text
                                bgGradient="linear(to-r, #4CAF50, #2196F3)"
                                bgClip="text"
                                fontSize="3xl"
                                fontWeight="bold"
                                mb={1}
                                display={{ base: "block", md: "none" }}
                            >
                                Free Garden
                            </Text>
                            <Heading as="h1" size="xl" color="white" fontWeight="normal">
                                Crear cuenta
                            </Heading>
                            <Text color="gray.500" fontSize="sm" mt={2}>
                                Únete a Free Garden y automatiza tu jardín
                            </Text>
                        </Box>

                        {/* Mensaje de error */}
                        {error && (
                            <Alert
                                status="error"
                                bg="rgba(229, 62, 62, 0.15)"
                                color="red.200"
                                borderRadius="md"
                                fontSize="sm"
                            >
                                <AlertIcon color="red.400" />
                                {error}
                            </Alert>
                        )}

                        {/* Formulario */}
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width="100%">
                                    <FormControl isInvalid={!!formErrors.nombre}>
                                        <Input
                                            id="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Nombre"
                                            bg="#1E1E1E"
                                            border="none"
                                            color="white"
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ bg: "#252525" }}
                                            _focus={{
                                                bg: "#252525",
                                                borderColor: "#4CAF50",
                                            }}
                                            borderRadius="md"
                                            size="md"
                                        />
                                        {formErrors.nombre && <FormErrorMessage>{formErrors.nombre}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={!!formErrors.apellido}>
                                        <Input
                                            id="apellido"
                                            value={formData.apellido}
                                            onChange={handleChange}
                                            placeholder="Apellido"
                                            bg="#1E1E1E"
                                            border="none"
                                            color="white"
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ bg: "#252525" }}
                                            _focus={{
                                                bg: "#252525",
                                                borderColor: "#4CAF50",
                                            }}
                                            borderRadius="md"
                                            size="md"
                                        />
                                        {formErrors.apellido && <FormErrorMessage>{formErrors.apellido}</FormErrorMessage>}
                                    </FormControl>
                                </SimpleGrid>

                                <FormControl isInvalid={!!formErrors.email}>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Correo electrónico"
                                        bg="#1E1E1E"
                                        border="none"
                                        color="white"
                                        _placeholder={{ color: 'gray.500' }}
                                        _hover={{ bg: "#252525" }}
                                        _focus={{
                                            bg: "#252525",
                                            borderColor: "#4CAF50",
                                        }}
                                        borderRadius="md"
                                        size="md"
                                    />
                                    {formErrors.email && <FormErrorMessage>{formErrors.email}</FormErrorMessage>}
                                </FormControl>

                                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width="100%">
                                    <FormControl isInvalid={!!formErrors.password}>
                                        <InputGroup size="md">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Contraseña"
                                                bg="#1E1E1E"
                                                border="none"
                                                color="white"
                                                _placeholder={{ color: 'gray.500' }}
                                                _hover={{ bg: "#252525" }}
                                                _focus={{
                                                    bg: "#252525",
                                                    borderColor: "#4CAF50",
                                                }}
                                                borderRadius="md"
                                            />
                                            <InputRightElement>
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {formErrors.password && <FormErrorMessage>{formErrors.password}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={!!formErrors.confirmPassword}>
                                        <InputGroup size="md">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Confirmar contraseña"
                                                bg="#1E1E1E"
                                                border="none"
                                                color="white"
                                                _placeholder={{ color: 'gray.500' }}
                                                _hover={{ bg: "#252525" }}
                                                _focus={{
                                                    bg: "#252525",
                                                    borderColor: "#4CAF50",
                                                }}
                                                borderRadius="md"
                                            />
                                            <InputRightElement>
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {formErrors.confirmPassword && <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>}
                                    </FormControl>
                                </SimpleGrid>

                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    width="100%"
                                    bg="#4CAF50"
                                    color="white"
                                    _hover={{ bg: '#3B8C3F' }}
                                    _active={{ bg: '#2D682F' }}
                                    size="lg"
                                    mt={3}
                                    rightIcon={<FiArrowRight />}
                                >
                                    Registrarse
                                </Button>

                                <Flex justify="center" align="center" mt={2}>
                                    <Text color="gray.500" fontSize="sm">
                                        ¿Ya tienes una cuenta?
                                    </Text>
                                    <Link
                                        as={RouterLink}
                                        to="/login"
                                        color="#4CAF50"
                                        fontWeight="medium"
                                        ml={2}
                                        fontSize="sm"
                                        _hover={{ color: '#3B8C3F' }}
                                    >
                                        Inicia sesión
                                    </Link>
                                </Flex>
                            </VStack>
                        </form>
                    </VStack>
                </Box>
            </GridItem>
        </Grid>
    );
};

export default Register;