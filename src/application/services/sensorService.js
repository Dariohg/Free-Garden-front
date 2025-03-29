import { SensorRepository } from '@infrastructure/repositories/sensorRepository';

export class SensorService {
    constructor() {
        this.sensorRepository = new SensorRepository();
    }

    async getEnvironmentData() {
        const [tempData, humidityData] = await Promise.all([
            this.sensorRepository.getSensorData('ENV_TEMP'),
            this.sensorRepository.getSensorData('ENV_HUM')
        ]);

        return {
            temperature: tempData,
            humidity: humidityData
        };
    }

    async getSoilHumidity() {
        return this.sensorRepository.getSensorData('SOIL_HUM');
    }

    async getWaterPH() {
        return this.sensorRepository.getSensorData('WATER_PH');
    }

    async getWaterLevel() {
        return this.sensorRepository.getSensorData('WATER_LEVEL');
    }

    async getAllSensorsData() {
        const allSensors = await this.sensorRepository.getAllSensorsData();

        // Organizar los datos en una estructura fácil de usar
        const result = {
            environment: {
                temperature: allSensors.find(s => s.id === 'ENV_TEMP'),
                humidity: allSensors.find(s => s.id === 'ENV_HUM')
            },
            soilHumidity: allSensors.find(s => s.id === 'SOIL_HUM'),
            waterPH: allSensors.find(s => s.id === 'WATER_PH'),
            waterLevel: allSensors.find(s => s.id === 'WATER_LEVEL')
        };

        return result;
    }

    async getSensorHistory(sensorId, limit = 10) {
        return this.sensorRepository.getSensorReadings(sensorId, limit);
    }
}