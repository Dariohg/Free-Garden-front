import { SensorData, SensorReading } from '../../domain/models/sensor';

// Datos simulados para los sensores
const mockSensorsData = {
    ENV_TEMP: {
        id: 'ENV_TEMP',
        type: 'temperature',
        value: 24,
        unit: '°C',
        minValue: 15,
        maxValue: 35,
        status: 'active',
        timestamp: new Date().toISOString()
    },
    ENV_HUM: {
        id: 'ENV_HUM',
        type: 'humidity',
        value: 65,
        unit: '%',
        minValue: 40,
        maxValue: 90,
        status: 'active',
        timestamp: new Date().toISOString()
    },
    SOIL_HUM: {
        id: 'SOIL_HUM',
        type: 'soil_humidity',
        value: 65,
        unit: '%',
        minValue: 30,
        maxValue: 80,
        status: 'active',
        timestamp: new Date().toISOString()
    },
    WATER_PH: {
        id: 'WATER_PH',
        type: 'ph',
        value: 6.8,
        unit: 'pH',
        minValue: 5.5,
        maxValue: 7.5,
        status: 'active',
        timestamp: new Date().toISOString()
    },
    WATER_LEVEL: {
        id: 'WATER_LEVEL',
        type: 'water_level',
        value: 85, // valor del sensor ultrasónico en cm
        unit: 'cm',
        minValue: 10,
        maxValue: 100,
        status: 'active',
        timestamp: new Date().toISOString()
    }
};

// Historial simulado de lecturas
const mockSensorReadingsHistory = {
    ENV_TEMP: [
        { id: '1', sensorId: 'ENV_TEMP', value: 23.5, timestamp: '2025-03-29T09:00:00Z' },
        { id: '2', sensorId: 'ENV_TEMP', value: 24.0, timestamp: '2025-03-29T10:00:00Z' },
        { id: '3', sensorId: 'ENV_TEMP', value: 24.5, timestamp: '2025-03-29T11:00:00Z' },
        { id: '4', sensorId: 'ENV_TEMP', value: 24.0, timestamp: '2025-03-29T12:00:00Z' }
    ],
    ENV_HUM: [
        { id: '1', sensorId: 'ENV_HUM', value: 63, timestamp: '2025-03-29T09:00:00Z' },
        { id: '2', sensorId: 'ENV_HUM', value: 64, timestamp: '2025-03-29T10:00:00Z' },
        { id: '3', sensorId: 'ENV_HUM', value: 65, timestamp: '2025-03-29T11:00:00Z' },
        { id: '4', sensorId: 'ENV_HUM', value: 66, timestamp: '2025-03-29T12:00:00Z' }
    ],
    SOIL_HUM: [
        { id: '1', sensorId: 'SOIL_HUM', value: 62, timestamp: '2025-03-29T09:00:00Z' },
        { id: '2', sensorId: 'SOIL_HUM', value: 63, timestamp: '2025-03-29T10:00:00Z' },
        { id: '3', sensorId: 'SOIL_HUM', value: 65, timestamp: '2025-03-29T11:00:00Z' },
        { id: '4', sensorId: 'SOIL_HUM', value: 64, timestamp: '2025-03-29T12:00:00Z' }
    ],
    WATER_PH: [
        { id: '1', sensorId: 'WATER_PH', value: 6.7, timestamp: '2025-03-29T09:00:00Z' },
        { id: '2', sensorId: 'WATER_PH', value: 6.8, timestamp: '2025-03-29T10:00:00Z' },
        { id: '3', sensorId: 'WATER_PH', value: 6.8, timestamp: '2025-03-29T11:00:00Z' },
        { id: '4', sensorId: 'WATER_PH', value: 6.9, timestamp: '2025-03-29T12:00:00Z' }
    ],
    WATER_LEVEL: [
        { id: '1', sensorId: 'WATER_LEVEL', value: 80, timestamp: '2025-03-29T09:00:00Z' },
        { id: '2', sensorId: 'WATER_LEVEL', value: 82, timestamp: '2025-03-29T10:00:00Z' },
        { id: '3', sensorId: 'WATER_LEVEL', value: 84, timestamp: '2025-03-29T11:00:00Z' },
        { id: '4', sensorId: 'WATER_LEVEL', value: 85, timestamp: '2025-03-29T12:00:00Z' }
    ]
};

export class SensorRepository {
    async getSensorData(sensorId) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));

        if (!mockSensorsData[sensorId]) {
            throw new Error(`Sensor with ID ${sensorId} not found`);
        }

        return SensorData.fromJSON(mockSensorsData[sensorId]);
    }

    async getAllSensorsData() {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

        return Object.values(mockSensorsData).map(data => SensorData.fromJSON(data));
    }

    async getSensorReadings(sensorId, limit = 10) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 400));

        if (!mockSensorReadingsHistory[sensorId]) {
            return [];
        }

        return mockSensorReadingsHistory[sensorId]
            .slice(0, limit)
            .map(reading => SensorReading.fromJSON(reading));
    }

    async updateSensorValue(sensorId, newValue) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));

        if (!mockSensorsData[sensorId]) {
            throw new Error(`Sensor with ID ${sensorId} not found`);
        }

        // Actualizar el valor y timestamp
        mockSensorsData[sensorId].value = newValue;
        mockSensorsData[sensorId].timestamp = new Date().toISOString();

        // Añadir al historial
        const newReading = {
            id: String(Date.now()),
            sensorId: sensorId,
            value: newValue,
            timestamp: new Date().toISOString()
        };

        if (!mockSensorReadingsHistory[sensorId]) {
            mockSensorReadingsHistory[sensorId] = [];
        }

        mockSensorReadingsHistory[sensorId].unshift(newReading);

        return SensorData.fromJSON(mockSensorsData[sensorId]);
    }
}