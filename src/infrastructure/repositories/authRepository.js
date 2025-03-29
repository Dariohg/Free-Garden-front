import axios from 'axios';

export class AuthRepository {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        this.axios = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
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
    }

    async login(email, password) {
        try {
            const response = await this.axios.post('/auth/login', { email, password });

            // Guardar token en localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data.user;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    async register(userData) {
        try {
            const response = await this.axios.post('/auth/register', userData);

            // Guardar token en localStorage si el backend lo devuelve al registrar
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data.user;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    async logout() {
        try {
            // Llamar al endpoint de logout si existe
            // await this.axios.post('/auth/logout');

            // Eliminar token del localStorage
            localStorage.removeItem('token');
            return true;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    async getCurrentUser() {
        try {
            // Si no hay token, no hay usuario autenticado
            const token = localStorage.getItem('token');
            if (!token) return null;

            const response = await this.axios.get('/auth/me');
            return response.data.user;
        } catch (error) {
            // Si el error es 401, significa que el token expiró o es inválido
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                return null;
            }
            throw this._handleError(error);
        }
    }

    _handleError(error) {
        if (error.response) {
            // Error de respuesta del servidor
            const { status, data } = error.response;

            if (status === 401) {
                // No autorizado
                localStorage.removeItem('token');
                return new Error(data.message || 'No estás autorizado para realizar esta acción');
            }

            if (status === 400) {
                // Error de validación
                return new Error(data.message || 'Datos inválidos');
            }

            return new Error(data.message || 'Error en el servidor');
        }

        if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            return new Error('No se pudo establecer conexión con el servidor');
        }

        // Error en la configuración de la petición
        return error;
    }
}