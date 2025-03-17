import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Flex,
    Stack,
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
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const { login } = useAuth();

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

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <MotionBox
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            w={{ base: "90%", sm: "420px" }}
            mx="auto"
        >
            <MotionBox
                variants={itemVariants}
                mb={10}
                textAlign="center"
            >
                <Text
                    bgGradient="linear(to-r, #4CAF50, #2196F3)"
                    bgClip="text"
                    fontSize="3xl"
                    fontWeight="extrabold"
                    letterSpacing="tight"
                >
                    Free Garden
                </Text>
                <Heading
                    as="h1"
                    size="xl"
                    color="white"
                    fontWeight="thin"
                    letterSpacing="tight"
                    mt={2}
                >
                    Iniciar Sesión
                </Heading>
            </MotionBox>

            {error && (
                <MotionBox variants={itemVariants} mb={6}>
                    <Alert status="error" borderRadius="md" bg="rgba(229, 62, 62, 0.2)" border="1px solid" borderColor="red.500" color="white">
                        <AlertIcon color="red.500" />
                        {error}
                    </Alert>
                </MotionBox>
            )}

            <MotionBox variants={itemVariants}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                        <FormControl isInvalid={!!formErrors.email}>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                                variant="unstyled"
                                p={4}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="none"
                                borderBottom="2px solid"
                                borderColor="rgba(255, 255, 255, 0.2)"
                                borderRadius="4px 4px 0 0"
                                color="white"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                _focus={{
                                    borderColor: "#4CAF50",
                                    bg: "rgba(255, 255, 255, 0.07)"
                                }}
                                fontSize="md"
                                h="56px"
                            />
                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!formErrors.password}>
                            <InputGroup>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    variant="unstyled"
                                    p={4}
                                    bg="rgba(255, 255, 255, 0.05)"
                                    border="none"
                                    borderBottom="2px solid"
                                    borderColor="rgba(255, 255, 255, 0.2)"
                                    borderRadius="4px 4px 0 0"
                                    color="white"
                                    _placeholder={{ color: 'gray.500' }}
                                    _hover={{ borderColor: "rgba(76, 175, 80, 0.5)" }}
                                    _focus={{
                                        borderColor: "#4CAF50",
                                        bg: "rgba(255, 255, 255, 0.07)"
                                    }}
                                    fontSize="md"
                                    h="56px"
                                />
                                <InputRightElement h="56px">
                                    <Box
                                        as="button"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        color="gray.500"
                                        _hover={{ color: "white" }}
                                        bg="transparent"
                                        border="none"
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
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

                        <MotionBox
                            variants={itemVariants}
                            w="full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                w="full"
                                h="56px"
                                bg="#4CAF50"
                                color="white"
                                fontWeight="medium"
                                fontSize="md"
                                _hover={{ bg: '#3B8C3F' }}
                                _active={{ bg: '#2D682F' }}
                                _focus={{ boxShadow: 'none' }}
                                borderRadius="4px"
                                rightIcon={<FiArrowRight />}
                            >
                                Iniciar Sesión
                            </Button>
                        </MotionBox>

                        <MotionFlex
                            variants={itemVariants}
                            justify="center"
                            align="center"
                            mt={6}
                        >
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
                                _hover={{ textDecoration: 'none', color: '#3B8C3F' }}
                            >
                                Regístrate
                            </Link>
                        </MotionFlex>

                        <MotionBox variants={itemVariants} textAlign="center" mt={8}>
                            <Text fontSize="xs" color="gray.500">
                                Para demostración, utiliza:
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                                admin@freegarden.com / admin123
                            </Text>
                        </MotionBox>
                    </VStack>
                </form>
            </MotionBox>
        </MotionBox>
    );
};

export default Login;