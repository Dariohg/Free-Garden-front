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
    Grid,
    GridItem,
    Flex,
    useColorModeValue,
    ScaleFade,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
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

    const bgColor = useColorModeValue('white', 'background.dark.secondary');
    const borderColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)');

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

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Box
                bg={bgColor}
                p={8}
                borderRadius="xl"
                boxShadow="lg"
                w={{ base: "full", sm: "550px", md: "650px" }}
                maxW="100%"
                borderWidth="1px"
                borderColor={borderColor}
            >
                <Flex align="center" mb={6}>
                    <IconButton
                        icon={<FiArrowLeft />}
                        aria-label="Volver"
                        variant="ghost"
                        mr={4}
                        onClick={() => navigate('/login')}
                    />
                    <Stack spacing={0}>
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            bgGradient="linear(to-r, brand.500, accent.500)"
                            bgClip="text"
                        >
                            Free Garden
                        </Text>
                        <Heading as="h1" size="md">
                            Crear cuenta
                        </Heading>
                    </Stack>
                </Flex>

                {error && (
                    <Alert status="error" borderRadius="md" variant="subtle" mb={6}>
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={6}>
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                            <GridItem>
                                <FormControl isInvalid={!!formErrors.nombre}>
                                    <FormLabel htmlFor="nombre">Nombre</FormLabel>
                                    <Input
                                        id="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                    />
                                    <FormErrorMessage>{formErrors.nombre}</FormErrorMessage>
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isInvalid={!!formErrors.apellido}>
                                    <FormLabel htmlFor="apellido">Apellido</FormLabel>
                                    <Input
                                        id="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        placeholder="Tu apellido"
                                    />
                                    <FormErrorMessage>{formErrors.apellido}</FormErrorMessage>
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={{ base: 1, md: 2 }}>
                                <FormControl isInvalid={!!formErrors.email}>
                                    <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="tu@ejemplo.com"
                                    />
                                    <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isInvalid={!!formErrors.password}>
                                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                                    <InputGroup>
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Crea una contraseña"
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
                            </GridItem>

                            <GridItem>
                                <FormControl isInvalid={!!formErrors.confirmPassword}>
                                    <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
                                    <InputGroup>
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirma tu contraseña"
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                variant="ghost"
                                                size="sm"
                                                icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <Button
                            type="submit"
                            colorScheme="brand"
                            size="lg"
                            fontSize="md"
                            isLoading={isLoading}
                            mt={2}
                            w="full"
                        >
                            Registrarse
                        </Button>
                    </Stack>
                </form>

                <Divider borderColor="gray.200" my={6} />

                <Flex justifyContent="center" fontSize="sm">
                    <Text color="text.secondary">¿Ya tienes una cuenta?</Text>
                    <Link
                        as={RouterLink}
                        to="/login"
                        color="brand.500"
                        _hover={{ color: 'brand.400' }}
                        fontWeight="semibold"
                        ml={1}
                    >
                        Inicia sesión
                    </Link>
                </Flex>
            </Box>
        </ScaleFade>
    );
};

export default Register;