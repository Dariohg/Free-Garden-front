// AuthRepository.js completo con debugging
import axios from 'axios';

export class AuthRepository {
    constructor() {
        this.baseURL = 'http://52.21.24.207:8080/v1';

        this.axios = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: false
        });

        // Interceptor para agregar el token a las peticiones
        this.axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Interceptor para debugging de respuestas
        this.axios.interceptors.response.use(
            (response) => {
                console.log('Respuesta recibida:', response.status);
                return response;
            },
            (error) => {
                console.error('Error en interceptor de respuesta:', error);
                return Promise.reject(error);
            }
        );
    }

    async login(email, password) {
        try {
            const response = await this.axios.post('/users/login', {
                email,
                password
            });

            // Verificar la estructura de respuesta correcta
            // La API parece devolver: { success, message, data: { token } }
            if (response.data && response.data.data && response.data.data.token) {
                localStorage.setItem('token', response.data.data.token);

                // También guardar los datos del usuario si están disponibles
                if (response.data.data.user) {
                    localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                } else {
                    // Si no hay datos de usuario en la respuesta, construir un objeto básico
                    const userData = {
                        email: email,
                        // Otros campos básicos que puedas necesitar
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                }

                return {
                    success: true,
                    user: response.data.data.user || { email },
                    token: response.data.data.token
                };
            } else if (response.data && response.data.token) {
                // Alternativa: por si la estructura es { token, user }
                localStorage.setItem('token', response.data.token);

                if (response.data.user) {
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                }

                return {
                    success: true,
                    user: response.data.user || { email },
                    token: response.data.token
                };
            }

            throw new Error('Formato de respuesta inválido: No se encontró el token');
        } catch (error) {
            console.error('Error en login:', error);
            throw this._handleError(error);
        }
    }

    async register(userData) {
        try {
            // Adaptar los datos al formato que espera la API
            const apiData = {
                email: userData.email,
                first_name: userData.nombre,
                last_name: userData.apellido,
                password: userData.password,
                kit_code: userData.codigoSistema
            };

            console.log('Datos de registro a enviar:', apiData);

            const response = await this.axios.post('/users/', apiData);

            console.log('Respuesta de registro:', response.data);

            // Si la respuesta es exitosa pero no incluye token, seguimos considerándola válida
            if (response.data && response.data.success) {
                console.log('Registro exitoso sin token');
                return response.data;
            }

            // Si hay token (por si en el futuro cambia la API), guardarlo
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('Token guardado en localStorage');
            } else {
                console.warn('No se recibió token en la respuesta de registro');
            }

            return response.data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw this._handleError(error);
        }
    }

    async logout() {
        try {
            console.log('Realizando logout');
            // Eliminar token y datos del usuario del localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            console.log('Datos de sesión eliminados');
            return true;
        } catch (error) {
            console.error('Error en logout:', error);
            throw this._handleError(error);
        }
    }

    async getCurrentUser() {
        try {
            // Si no hay token, no hay usuario autenticado
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No hay token para obtener usuario actual');
                return null;
            }

            // Intenta recuperar los datos del usuario del localStorage
            const userData = localStorage.getItem('userData');
            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    console.log('Usuario recuperado del localStorage:', parsedUser);
                    return parsedUser;
                } catch (e) {
                    console.error('Error parseando datos de usuario:', e);
                    localStorage.removeItem('userData');
                    return null;
                }
            }

            console.log('No se encontraron datos de usuario en localStorage');
            return null;
        } catch (error) {
            console.error('Error obteniendo usuario actual:', error);

            if (error.response && error.response.status === 401) {
                console.log('Token inválido o expirado (401)');
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                return null;
            }
            throw this._handleError(error);
        }
    }

    _handleError(error) {
        if (error.response) {
            const { status, data } = error.response;

            if (status >= 200 && status < 300 && data && data.success) {
                return data;
            }

            let errorMessage = 'Error en la solicitud';
            if (data) {
                if (data.message) errorMessage = data.message;
                else if (data.detail) errorMessage = data.detail;
                else if (typeof data === 'string') errorMessage = data;
            }

            return new Error(errorMessage);
        }

        if (error.request) {
            return new Error('No se pudo establecer conexión con el servidor');
        }

        return error;
    }
}