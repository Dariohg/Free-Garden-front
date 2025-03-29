import { useSensorsContext } from '../contexts/SensorsContext';

export const useSensors = () => {
    const context = useSensorsContext();
    return context;
};