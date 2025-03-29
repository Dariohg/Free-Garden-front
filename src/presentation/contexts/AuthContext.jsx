import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../domain/services/authService';
import { AuthRepository } from '../../infrastructure/repositories/authRepository';

// Inicializar servicio y repositorio
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

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
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Verificar si hay un usuario autenticado al iniciar
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
                setError(null);
            } catch (err) {
                console.error('Error verificando autenticación:', err);
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const loggedUser = await authService.login(email, password);
            setUser(loggedUser);
            return { success: true };
        } catch (err) {
            console.error('Error de login:', err);
            setError(err.message);
            return {
                success: false,
                message: err.message || 'Credenciales incorrectas'
            };
        } finally {
            setLoading(false);
        }
    };

    // Función para registrar un nuevo usuario
    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await authService.register(userData);
            setUser(newUser);
            return {
                success: true,
                message: 'Usuario registrado correctamente'
            };
        } catch (err) {
            console.error('Error de registro:', err);
            setError(err.message);
            return {
                success: false,
                message: err.message || 'Error al registrar usuario'
            };
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
            setError(err.message);
        }
    };

    // Verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    // Valor del contexto
    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};