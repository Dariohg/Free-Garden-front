import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Avatar,
    Flex,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AnimatedBox from '../common/AnimatedBox';

// Componente de estrellas
const StarRating = ({ rating }) => {
    const stars = Array(5).fill(0);
    const activeColor = useColorModeValue('yellow.500', 'yellow.300');

    return (
        <Flex>
            {stars.map((_, index) => (
                <Icon
                    key={index}
                    as={FiStar}
                    color={index < rating ? activeColor : 'gray.300'}
                    fill={index < rating ? activeColor : 'none'}
                    ml={index > 0 ? 1 : 0}
                />
            ))}
        </Flex>
    );
};

// Componente de tarjeta de testimonio
const TestimonialCard = ({ testimonial, index }) => {
    const cardBg = useColorModeValue('white', 'background.card');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const gradientColor = index % 3 === 0
        ? 'brand.500'
        : index % 3 === 1
            ? 'accent.500'
            : 'purple.500';

    return (
        <AnimatedBox
            animation="scale"
            delay={0.15 * index}
        >
            <Box
                p={6}
                bg={cardBg}
                boxShadow="md"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                position="relative"
                transition="all 0.3s ease"
                _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "lg",
                }}
                h="100%"
                display="flex"
                flexDirection="column"
            >
                {/* Barra de color en la parte superior */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="4px"
                    bgGradient={`linear(to-r, ${gradientColor}, ${gradientColor}Alpha.400)`}
                    borderTopLeftRadius="lg"
                    borderTopRightRadius="lg"
                />

                <Box mb={4} mt={2}>
                    <StarRating rating={testimonial.rating} />
                </Box>

                <Text fontSize="md" fontStyle="italic" flex="1" mb={4}>
                    "{testimonial.text}"
                </Text>

                <Flex align="center">
                    <Avatar
                        src={testimonial.avatar}
                        size="md"
                        name={testimonial.name}
                        mr={3}
                    />
                    <Box>
                        <Text fontWeight="bold">{testimonial.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {testimonial.title}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </AnimatedBox>
    );
};

const TestimonialsSection = () => {
    const sectionBg = useColorModeValue('white', 'background.primary');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    const testimonials = [
        {
            name: "Carlos Méndez",
            title: "Jardinero aficionado",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
            text: "Free Garden transformó mi pequeño jardín urbano. Ahora mis plantas están siempre hidratadas y puedo monitorear todo desde mi teléfono, incluso cuando estoy de viaje.",
            rating: 5
        },
        {
            name: "Laura Gutiérrez",
            title: "Diseñadora de interiores",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
            text: "Como diseñadora, valoro tanto la estética como la funcionalidad. Free Garden no solo es eficiente sino que se integra perfectamente con mis diseños de interiores verdes.",
            rating: 5
        },
        {
            name: "Roberto Sánchez",
            title: "Propietario de vivero",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
            text: "Implementamos Free Garden en nuestro vivero y ha reducido nuestros costos de agua en un 35%. Además, nuestras plantas están más saludables que nunca.",
            rating: 4
        },
        {
            name: "Elena Torres",
            title: "Bióloga",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
            text: "Como bióloga, aprecio la precisión del sistema Free Garden. Los sensores capturan exactamente la información que necesito para optimizar el crecimiento de mis especímenes.",
            rating: 5
        },
        {
            name: "Mario Vargas",
            title: "Restaurante con huerto",
            avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
            text: "Nuestro restaurante utiliza hierbas frescas de nuestro propio huerto, y Free Garden nos asegura que siempre tenemos productos de la mejor calidad para nuestros clientes.",
            rating: 5
        },
        {
            name: "Ana Ramírez",
            title: "Maestra jubilada",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
            text: "A mis 68 años, no soy muy tecnológica, pero Free Garden es increíblemente fácil de usar. Me ha permitido mantener mi pasión por la jardinería sin el esfuerzo físico constante.",
            rating: 4
        }
    ];

    return (
        <Box py={20} bg={sectionBg}>
            <Container maxW="container.xl">
                <Box textAlign="center" mb={16}>
                    <AnimatedBox animation="fadeIn">
                        <Text
                            color="brand.500"
                            fontWeight="bold"
                            mb={3}
                            letterSpacing="wider"
                            textTransform="uppercase"
                        >
                            Testimonios
                        </Text>
                        <Heading
                            as="h2"
                            size="xl"
                            mb={4}
                        >
                            Qué dicen nuestros usuarios
                        </Heading>
                    </AnimatedBox>

                    <AnimatedBox animation="fadeIn" delay={0.2}>
                        <Text
                            fontSize="lg"
                            color={textColor}
                            maxW="800px"
                            mx="auto"
                        >
                            Free Garden ha transformado la forma en que miles de personas cuidan sus jardines.
                            Estas son algunas de sus historias.
                        </Text>
                    </AnimatedBox>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default TestimonialsSection;