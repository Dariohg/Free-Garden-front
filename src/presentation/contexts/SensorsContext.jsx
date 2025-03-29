// src/presentation/contexts/SensorsContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SensorService } from '../../domain/services/sensorService';

const SensorsContext = createContext(null);

export const useSensorsContext = () => {
    const context = useContext(SensorsContext);
    if (!context) {
        throw new Error('useSensorsContext debe ser usado dentro de un SensorsProvider');
    }
    return context;
};

export const SensorsProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sensorData, setSensorData] = useState({
        environment: { temperature: null, humidity: null },
        soilHumidity: null,
        waterPH: null,
        waterLevel: null
    });

    const sensorService = new SensorService();

    const fetchAllSensorsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await sensorService.getAllSensorsData();
            setSensorData(data);
        } catch (err) {
            console.error('Error fetching sensor data:', err);
            setError('No se pudieron cargar los datos de los sensores');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchAllSensorsData();

        // Actualizar datos cada 60 segundos
        const intervalId = setInterval(fetchAllSensorsData, 60000);

        return () => clearInterval(intervalId);
    }, [fetchAllSensorsData]);

    // Función para refrescar manualmente los datos
    const refreshData = () => {
        fetchAllSensorsData();
    };

    // Función para obtener el historial de un sensor específico
    const getSensorHistory = async (sensorId, limit = 10) => {
        try {
            return await sensorService.getSensorHistory(sensorId, limit);
        } catch (err) {
            console.error(`Error fetching history for sensor ${sensorId}:`, err);
            throw err;
        }
    };

    const value = {
        isLoading,
        error,
        sensorData,
        refreshData,
        getSensorHistory
    };

    return <SensorsContext.Provider value={value}>{children}</SensorsContext.Provider>;
};