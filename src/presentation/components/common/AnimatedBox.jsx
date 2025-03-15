import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../../core/hooks/useScrollAnimation';

// Crear un componente Box con animación usando framer-motion
const MotionBox = motion(Box);

/**
 * Componente que anima su contenido cuando entra en el viewport (scroll)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a animar
 * @param {string} props.animation - Tipo de animación ('fadeIn', 'slideUp', 'slideRight', 'slideLeft', 'scale')
 * @param {number} props.delay - Retraso en segundos antes de iniciar la animación
 * @param {number} props.duration - Duración de la animación en segundos
 * @param {number} props.threshold - Umbral de visibilidad para activar la animación (0-1)
 * @param {boolean} props.once - Si la animación debe ocurrir una sola vez
 */
const AnimatedBox = ({
                         children,
                         animation = 'fadeIn',
                         delay = 0,
                         duration = 0.5,
                         threshold = 0.1,
                         once = true,
                         ...props
                     }) => {
    const [ref, isVisible] = useScrollAnimation({
        threshold,
        triggerOnce: once,
    });

    // Definir las variantes de animación
    const animations = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slideUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
        },
        slideRight: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
        },
        slideLeft: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
        },
        scaleUp: {
            hidden: { opacity: 0, scale: 0.5, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 },
        },
        fadeInBlur: {
            hidden: { opacity: 0, filter: 'blur(10px)' },
            visible: { opacity: 1, filter: 'blur(0px)' },
        },
    };

    // Obtener la animación seleccionada o usar fadeIn por defecto
    const selectedAnimation = animations[animation] || animations.fadeIn;

    return (
        <MotionBox
            ref={ref}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={selectedAnimation}
            transition={{ duration, delay, ease: 'easeOut' }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};

export default AnimatedBox;