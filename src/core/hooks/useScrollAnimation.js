import { useState, useEffect, useRef } from 'react';

/**
 * Hook personalizado para detectar cuando un elemento es visible en el viewport
 * y aplicar animaciones basadas en scroll
 *
 * @param {Object} options - Opciones para la detección de intersección
 * @param {number} options.threshold - Porcentaje del elemento que debe ser visible (0-1)
 * @param {number} options.triggerOnce - Si la animación debe dispararse solo una vez
 * @returns {Array} - [ref, isVisible] donde ref es la referencia al elemento y isVisible es un booleano
 */
const useScrollAnimation = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const {
        threshold = 0.1,
        triggerOnce = true,
        rootMargin = '0px'
    } = options;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Actualizar el estado cuando el elemento entra o sale del viewport
                setIsVisible(entry.isIntersecting);

                // Si triggerOnce es true y el elemento es visible, dejar de observar
                if (triggerOnce && entry.isIntersecting) {
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null, // viewport
                rootMargin,
                threshold,
            }
        );

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        // Limpieza al desmontar
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, triggerOnce, rootMargin]);

    return [ref, isVisible];
};

export default useScrollAnimation;