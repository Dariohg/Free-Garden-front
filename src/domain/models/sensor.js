export class SensorData {
    constructor({
                    id = null,
                    type = '',
                    value = 0,
                    unit = '',
                    timestamp = new Date().toISOString(),
                    minValue = 0,
                    maxValue = 100,
                    status = 'active'
                }) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.timestamp = timestamp;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.status = status;
    }

    static fromJSON(json) {
        return new SensorData({
            id: json.id,
            type: json.type,
            value: json.value,
            unit: json.unit,
            timestamp: json.timestamp,
            minValue: json.min_value || json.minValue,
            maxValue: json.max_value || json.maxValue,
            status: json.status
        });
    }
}

export class SensorReading {
    constructor({
                    id = null,
                    sensorId = null,
                    value = 0,
                    timestamp = new Date().toISOString()
                }) {
        this.id = id;
        this.sensorId = sensorId;
        this.value = value;
        this.timestamp = timestamp;
    }

    static fromJSON(json) {
        return new SensorReading({
            id: json.id,
            sensorId: json.sensor_id || json.sensorId,
            value: json.value,
            timestamp: json.timestamp
        });
    }
}