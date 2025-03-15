import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Stack,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    IconButton,
    FormErrorMessage,
    Alert,
    AlertIcon,
    Divider,
    Link,
    Flex,
    useColorModeValue,
    ScaleFade,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const { login } = useAuth();

    const bgColor = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

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

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Box
                bg={bgColor}
                p={8}
                borderRadius="xl"
                boxShadow="lg"
                w={{ base: "full", sm: "450px" }}
                maxW="100%"
                borderWidth="1px"
                borderColor={borderColor}
            >
                <Stack spacing={6}>
                    <Stack align="center" spacing={2}>
                        <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            bgGradient="linear(to-r, brand.500, accent.500)"
                            bgClip="text"
                        >
                            Free Garden
                        </Text>
                        <Heading as="h1" size="lg" textAlign="center">
                            Iniciar Sesión
                        </Heading>
                        <Text color="text.secondary" fontSize="sm" textAlign="center">
                            Accede a tu sistema de riego automático
                        </Text>
                    </Stack>

                    {error && (
                        <Alert status="error" borderRadius="md" variant="subtle">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!formErrors.email}>
                                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@ejemplo.com"
                                />
                                <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!formErrors.password}>
                                <Flex align="baseline" justify="space-between">
                                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                                    <Text
                                        color="brand.500"
                                        fontSize="xs"
                                        cursor="pointer"
                                        _hover={{ textDecoration: "underline" }}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Text>
                                </Flex>
                                <InputGroup>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Tu contraseña"
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            variant="ghost"
                                            size="sm"
                                            icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="brand"
                                size="lg"
                                fontSize="md"
                                isLoading={isLoading}
                                mt={4}
                            >
                                Iniciar Sesión
                            </Button>

                            <Text fontSize="sm" color="text.secondary" textAlign="center" mt={4}>
                                Para fines de demostración, usa:
                                <br />
                                <Text as="span" fontWeight="medium" color="text.primary">
                                    admin@freegarden.com / admin123
                                </Text>
                            </Text>
                        </Stack>
                    </form>

                    <Divider borderColor="gray.200" my={2} />

                    <Box textAlign="center" fontSize="sm">
                        <Text color="text.secondary">¿No tienes una cuenta?</Text>
                        <Link
                            as={RouterLink}
                            to="/register"
                            color="brand.500"
                            _hover={{ color: 'brand.400' }}
                            fontWeight="semibold"
                        >
                            Regístrate
                        </Link>
                    </Box>
                </Stack>
            </Box>
        </ScaleFade>
    );
};

export default Login;