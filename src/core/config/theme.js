import { extendTheme } from "@chakra-ui/react";

const colors = {
    brand: {
        50: "#E8F5E9",
        100: "#C8E6C9",
        200: "#A5D6A7",
        300: "#81C784",
        400: "#66BB6A",
        500: "#4CAF50", // Verde primario
        600: "#43A047",
        700: "#388E3C",
        800: "#2E7D32",
        900: "#1B5E20",
    },
    accent: {
        50: "#E1F5FE",
        100: "#B3E5FC",
        200: "#81D4FA",
        300: "#4FC3F7",
        400: "#29B6F6",
        500: "#03A9F4", // Azul acento (agua)
        600: "#039BE5",
        700: "#0288D1",
        800: "#0277BD",
        900: "#01579B",
    },
    // Color para alertas de bajo nivel de agua
    waterAlert: {
        50: "#E1F5FE",
        300: "#4FC3F7",
        500: "#03A9F4",
        700: "#0288D1",
    },
    // Color para alertas de temperatura
    tempAlert: {
        50: "#FFF3E0",
        300: "#FFB74D",
        500: "#FF9800",
        700: "#F57C00",
    },
    // Niveles de humedad
    humidity: {
        low: "#F57F17", // Amarillo/naranja para humedad baja
        optimal: "#43A047", // Verde para humedad óptima
        high: "#0277BD", // Azul para exceso de humedad
    },
    background: {
        primary: "#121212", // Fondo principal muy oscuro
        secondary: "#1E1E1E", // Componentes y tarjetas
        tertiary: "#252525", // Elementos interactivos
        card: "#2D2D2D", // Fondo de tarjetas ligeramente más claro
    },
    text: {
        primary: "#FFFFFF", // Texto principal
        secondary: "rgba(255, 255, 255, 0.7)", // Texto secundario
        disabled: "rgba(255, 255, 255, 0.5)", // Texto deshabilitado
        hint: "rgba(255, 255, 255, 0.5)", // Pistas/ayudas
    },
    success: {
        500: "#4CAF50", // Verde para éxito
    },
    error: {
        500: "#F44336", // Rojo para errores
    },
    warning: {
        500: "#FF9800", // Naranja para advertencias
    },
    info: {
        500: "#2196F3", // Azul para información
    },
};

// Componentes personalizados
const components = {
    Button: {
        baseStyle: {
            fontWeight: "500",
            borderRadius: "md",
            _focus: {
                boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.4)",
            },
        },
        variants: {
            primary: {
                bg: "brand.500",
                color: "white",
                _hover: {
                    bg: "brand.600",
                    _disabled: {
                        bg: "brand.500",
                    },
                },
                _active: { bg: "brand.700" },
            },
            secondary: {
                bg: "transparent",
                color: "brand.400",
                border: "1px solid",
                borderColor: "brand.500",
                _hover: {
                    bg: "rgba(76, 175, 80, 0.12)",
                },
                _active: { bg: "rgba(76, 175, 80, 0.18)" },
            },
            accent: {
                bg: "accent.500",
                color: "white",
                _hover: {
                    bg: "accent.600",
                    _disabled: {
                        bg: "accent.500",
                    },
                },
                _active: { bg: "accent.700" },
            },
            ghost: {
                color: "text.primary",
                _hover: {
                    bg: "rgba(255, 255, 255, 0.1)",
                },
            },
            link: {
                color: "brand.400",
                _hover: {
                    textDecoration: "underline",
                },
            },
        },
        defaultProps: {
            variant: "primary",
        },
    },
    Card: {
        baseStyle: {
            container: {
                bg: "background.card",
                borderRadius: "lg",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                borderWidth: "1px",
                borderColor: "rgba(255, 255, 255, 0.05)",
                overflow: "hidden",
            },
        },
    },
    Input: {
        variants: {
            outline: {
                field: {
                    bg: "background.tertiary",
                    borderColor: "rgba(255, 255, 255, 0.16)",
                    _hover: {
                        borderColor: "rgba(255, 255, 255, 0.24)",
                    },
                    _focus: {
                        borderColor: "brand.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    },
                },
            },
            filled: {
                field: {
                    bg: "background.tertiary",
                    _hover: {
                        bg: "rgba(255, 255, 255, 0.08)",
                    },
                    _focus: {
                        bg: "rgba(255, 255, 255, 0.08)",
                        borderColor: "brand.500",
                    },
                },
            },
        },
    },
    Menu: {
        baseStyle: {
            list: {
                bg: "background.secondary",
                borderColor: "rgba(255, 255, 255, 0.08)",
            },
            item: {
                bg: "background.secondary",
                _hover: {
                    bg: "rgba(255, 255, 255, 0.08)",
                },
                _focus: {
                    bg: "rgba(255, 255, 255, 0.08)",
                },
            },
        },
    },
    Tabs: {
        variants: {
            enclosed: {
                tab: {
                    _selected: {
                        color: "brand.400",
                    },
                },
                tablist: {
                    borderColor: "rgba(255, 255, 255, 0.16)",
                },
            },
        },
    },
    Progress: {
        baseStyle: {
            track: {
                bg: "rgba(255, 255, 255, 0.12)",
            },
        },
    },
    Slider: {
        baseStyle: {
            track: {
                bg: "rgba(255, 255, 255, 0.12)",
            },
        },
    },
    Tooltip: {
        baseStyle: {
            bg: "gray.700",
            color: "white",
        },
    },
};

// Configuración del tema
const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
    disableColorModeToggle: true,
};

// Estilos globales
const styles = {
    global: {
        body: {
            bg: "background.primary",
            color: "text.primary",
        },
        // Personalización de scrollbar para tema oscuro
        "::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
        },
        "::-webkit-scrollbar-track": {
            background: "#1e1e1e",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#4CAF50",
            borderRadius: "4px",
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#388E3C",
        },
    },
};

// Tema personalizado
const theme = extendTheme({
    colors,
    components,
    config,
    styles,
    fonts: {
        heading: "'Inter', -apple-system, sans-serif",
        body: "'Inter', -apple-system, sans-serif",
    },
});

export default theme;