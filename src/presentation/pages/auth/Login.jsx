import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
    Box, Flex, Heading, Text, FormControl, Input, Button,
    InputGroup, InputRightElement, FormErrorMessage, Alert,
    AlertIcon, Link, VStack, Grid, GridItem, Image, IconButton
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        // Verificar si venimos de un registro exitoso
        if (location.state?.registerSuccess) {
            setRegisterSuccess(true);
        }
    }, [location]);

    // Validar el formulario
    const validateForm = () => {
        const errors = {};

        if (!email) {
            errors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email inválido';
        }

        if (!password) {
            errors.password = 'La contraseña es requerida';
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
        setRegisterSuccess(false);

        try {
            // Llamar a la función login con email y password
            const result = await login(email, password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            setError('Ocurrió un error al iniciar sesión');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para volver a la página principal
    const handleBack = () => {
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
                    src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2069&auto=format&fit=crop"
                    alt="Hermoso jardín"
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
                        Sistema de riego automático inteligente para tu jardín
                    </Text>
                </Box>
            </GridItem>

            {/* Sección derecha - Formulario de login */}
            <GridItem
                bg="#121212"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={4}
                position="relative"
            >
                <IconButton
                    position="absolute"
                    top={4}
                    left={4}
                    aria-label="Volver a inicio"
                    icon={<FiArrowLeft />}
                    variant="ghost"
                    color="gray.500"
                    _hover={{ color: "white" }}
                    onClick={handleBack}
                    size="md"
                />

                <Box
                    w="100%"
                    maxW="400px"
                    mx="auto"
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
                                Iniciar Sesión
                            </Heading>
                            <Text color="gray.500" fontSize="sm" mt={2}>
                                Accede a tu sistema de riego automático
                            </Text>
                        </Box>

                        {/* Mensaje de registro exitoso */}
                        {registerSuccess && (
                            <Alert
                                status="success"
                                bg="rgba(72, 187, 120, 0.15)"
                                color="green.200"
                                borderRadius="md"
                                fontSize="sm"
                            >
                                <AlertIcon color="green.400" />
                                Usuario registrado con éxito. Ahora puedes iniciar sesión.
                            </Alert>
                        )}

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
                                <FormControl isInvalid={!!formErrors.email}>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        size="lg"
                                    />
                                    {formErrors.email && <FormErrorMessage>{formErrors.email}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!formErrors.password}>
                                    <InputGroup size="lg">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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

                                <Flex justify="flex-end" w="full">
                                    <Link
                                        color="gray.500"
                                        fontSize="sm"
                                        _hover={{ color: "#4CAF50" }}
                                        href="#"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Flex>

                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    width="100%"
                                    bg="#4CAF50"
                                    color="white"
                                    _hover={{ bg: '#3B8C3F' }}
                                    _active={{ bg: '#2D682F' }}
                                    size="lg"
                                    mt={2}
                                    rightIcon={<FiArrowRight />}
                                >
                                    Iniciar Sesión
                                </Button>

                                <Flex justify="center" align="center" mt={2}>
                                    <Text color="gray.500" fontSize="sm">
                                        ¿No tienes una cuenta?
                                    </Text>
                                    <Link
                                        as={RouterLink}
                                        to="/register"
                                        color="#4CAF50"
                                        fontWeight="medium"
                                        ml={2}
                                        fontSize="sm"
                                        _hover={{ color: '#3B8C3F' }}
                                    >
                                        Regístrate
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

export default Login;