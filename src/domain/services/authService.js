import { User } from '../models/user';

export class AuthService {
    constructor(repository) {
        this.repository = repository;
    }

    async login(email, password) {
        try {
            const userData = await this.repository.login(email, password);
            return new User(
                userData.id,
                userData.nombre,
                userData.apellido,
                userData.email,
                userData.telefono,
                userData.codigo_sistema
            );
        } catch (error) {
            throw error;
        }
    }

    async register(userData) {
        try {
            const registeredUser = await this.repository.register(userData);
            return new User(
                registeredUser.id,
                registeredUser.nombre,
                registeredUser.apellido,
                registeredUser.email,
                registeredUser.telefono,
                registeredUser.codigo_sistema
            );
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.repository.logout();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const userData = await this.repository.getCurrentUser();
            if (!userData) return null;

            return new User(
                userData.id,
                userData.nombre,
                userData.apellido,
                userData.email,
                userData.telefono,
                userData.codigo_sistema
            );
        } catch (error) {
            throw error;
        }
    }
}