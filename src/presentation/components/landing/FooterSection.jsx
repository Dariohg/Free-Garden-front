import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    Flex,
    Icon,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiGithub, FiTwitter, FiInstagram, FiFacebook, FiDroplet } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedBox from '../common/AnimatedBox';

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'bold'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const FooterSection = () => {
    const footerBg = useColorModeValue('white', 'background.primary');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const textColor = useColorModeValue('gray.600', 'gray.400');
    const accentColor = useColorModeValue('brand.600', 'brand.400');

    return (
        <Box bg={footerBg} color={textColor} borderTop="1px solid" borderColor={borderColor}>
            <Container as={Stack} maxW={'container.xl'} py={10}>
                <AnimatedBox animation="fadeIn">
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                        <Stack align={'flex-start'} spacing={4}>
                            <ListHeader>Producto</ListHeader>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Características</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Precios</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Tutoriales</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>FAQ</Link>
                        </Stack>

                        <Stack align={'flex-start'} spacing={4}>
                            <ListHeader>Empresa</ListHeader>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Sobre nosotros</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Blog</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Contacto</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Prensa</Link>
                        </Stack>

                        <Stack align={'flex-start'} spacing={4}>
                            <ListHeader>Soporte</ListHeader>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Centro de ayuda</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Comunidad</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Instalación</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Garantía</Link>
                        </Stack>

                        <Stack align={'flex-start'} spacing={4}>
                            <ListHeader>Legal</ListHeader>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Política de privacidad</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Términos de servicio</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Política de cookies</Link>
                            <Link as={RouterLink} to="#" _hover={{ color: accentColor }}>Cumplimiento GDPR</Link>
                        </Stack>
                    </SimpleGrid>
                </AnimatedBox>

                <Divider my={8} borderColor={borderColor} />

                <AnimatedBox animation="fadeIn" delay={0.2}>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        justify={{ base: 'center', md: 'space-between' }}
                        align={{ base: 'center', md: 'center' }}
                        gap={4}
                    >
                        <Flex align="center">
                            <Icon as={FiDroplet} color={accentColor} boxSize={6} mr={2} />
                            <Text fontWeight="bold" fontSize="xl">
                                Free Garden
                            </Text>
                        </Flex>

                        <Text textAlign={{ base: 'center', md: 'left' }}>
                            © {new Date().getFullYear()} Free Garden Technologies. Todos los derechos reservados.
                        </Text>

                        <Stack direction={'row'} spacing={6}>
                            <Link href={'#'} isExternal>
                                <Icon as={FiFacebook} boxSize={5} _hover={{ color: accentColor }} />
                            </Link>
                            <Link href={'#'} isExternal>
                                <Icon as={FiTwitter} boxSize={5} _hover={{ color: accentColor }} />
                            </Link>
                            <Link href={'#'} isExternal>
                                <Icon as={FiInstagram} boxSize={5} _hover={{ color: accentColor }} />
                            </Link>
                            <Link href={'#'} isExternal>
                                <Icon as={FiGithub} boxSize={5} _hover={{ color: accentColor }} />
                            </Link>
                        </Stack>
                    </Flex>
                </AnimatedBox>
            </Container>
        </Box>
    );
};

export default FooterSection;