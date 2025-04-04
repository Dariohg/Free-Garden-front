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
                // Verificar si hay un token en localStorage
                const token = localStorage.getItem('token');

                if (token) {
                    // Intentar cargar los datos del usuario desde localStorage
                    const storedUser = localStorage.getItem('userData');
                    if (storedUser) {
                        try {
                            const userData = JSON.parse(storedUser);
                            setUser(userData);
                        } catch (e) {
                            console.error('Error al parsear datos del usuario:', e);
                            localStorage.removeItem('userData');
                        }
                    }
                } else {
                    setUser(null);
                }

                setError(null);
            } catch (err) {
                console.error('Error verificando autenticación:', err);
                setError(err.message);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
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
            const result = await authService.login(email, password);

            if (result && result.user) {
                setUser(result.user);
                return { success: true };
            } else {
                return {
                    success: false,
                    message: 'No se pudo obtener la información del usuario'
                };
            }
        } catch (err) {
            setError(err.message);
            return {
                success: false,
                message: err.message || 'Credenciales incorrectas'
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await authService.register(userData);

            // Solo verificamos si tuvo éxito
            if (result.success) {
                return {
                    success: true,
                    message: result.message || 'Usuario registrado correctamente'
                };
            } else {
                return {
                    success: false,
                    message: result.message || 'No se pudo completar el registro'
                };
            }
        } catch (err) {
            console.error('Error de registro:', err);
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
            setError(err.message);
        }
    };

    // Verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    // Actualizar datos del usuario
    const updateUser = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
    };

    // Valor del contexto
    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};