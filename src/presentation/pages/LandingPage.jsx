import { Box, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FiArrowUp } from 'react-icons/fi';
import { useState, useEffect } from 'react';

import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CtaSection from '../components/landing/CtaSection';
import FooterSection from '../components/landing/FooterSection';
import MockupsSection from "@presentation/components/landing/MockupsSection.jsx";

const LandingPage = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Control para el botón "volver arriba"
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const bgColor = useColorModeValue('gray.50', 'background.primary');

    return (
        <Box minH="100vh" bg={bgColor}>
            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Mockups Section */}
            <MockupsSection />

            {/* Benefits Section */}
            <BenefitsSection />

            {/* How it Works Section */}
            <HowItWorksSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Call to Action Section */}
            <CtaSection />

            {/* Footer */}
            <FooterSection />

            {/* Scroll to Top Button */}
            <IconButton
                aria-label="Volver arriba"
                icon={<FiArrowUp />}
                size="lg"
                colorScheme="brand"
                borderRadius="full"
                position="fixed"
                bottom="20px"
                right="20px"
                opacity={showScrollTop ? 1 : 0}
                visibility={showScrollTop ? "visible" : "hidden"}
                transition="all 0.3s"
                onClick={scrollToTop}
                zIndex={999}
                boxShadow="lg"
            />
        </Box>
    );
};

export default LandingPage;