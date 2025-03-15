import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Verificar si hay un usuario almacenado en localStorage al inicio
    useEffect(() => {
        const storedUser = localStorage.getItem('freeGardenUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('freeGardenUser');
            }
        }
        setLoading(false);
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            // Simulación de login para desarrollo
            // En producción, esto haría una petición a una API
            if (email === 'admin@freegarden.com' && password === 'admin123') {
                const userData = {
                    id: '1',
                    name: 'Administrador',
                    email: email,
                    role: 'admin',
                };

                // Guardar en localStorage
                localStorage.setItem('freeGardenUser', JSON.stringify(userData));
                setUser(userData);

                return { success: true };
            }

            return {
                success: false,
                message: 'Credenciales incorrectas. Intenta con admin@freegarden.com / admin123'
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.message || 'Error al iniciar sesión'
            };
        }
    };

    // Función para registrar un nuevo usuario
    const register = async (userData) => {
        try {
            // Simulación de registro para desarrollo
            console.log('Usuario registrado:', userData);

            return {
                success: true,
                message: 'Usuario registrado correctamente'
            };
        } catch (error) {
            console.error('Register error:', error);
            return {
                success: false,
                message: error.message || 'Error al registrar usuario'
            };
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('freeGardenUser');
        setUser(null);
        navigate('/login');
    };

    // Verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    // Valor del contexto
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};