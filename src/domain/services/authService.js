import { User } from '../models/user';

export class AuthService {
    constructor(repository) {
        this.repository = repository;
    }

    async login(email, password) {
        try {
            const result = await this.repository.login(email, password);

            if (result && result.success && (result.user || result.token)) {
                return {
                    success: true,
                    user: result.user,
                    token: result.token
                };
            }

            return {
                success: false,
                message: 'No se recibieron datos válidos del servidor'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error al iniciar sesión'
            };
        }
    }

    async register(userData) {
        try {
            const result = await this.repository.register(userData);

            if (result && result.success) {
                return {
                    success: true,
                    message: result.message || 'Usuario registrado correctamente'
                };
            } else {
                throw new Error(result.message || 'Error en el registro');
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.repository.logout();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const userData = await this.repository.getCurrentUser();
            if (!userData) return null;

            return User.fromApiResponse(userData);
        } catch (error) {
            throw error;
        }
    }

    async updateUserProfile(userId, userData) {
        try {
            const result = await this.repository.updateUserProfile(userId, userData);
            return result;
        } catch (error) {
            throw error;
        }
    }
}