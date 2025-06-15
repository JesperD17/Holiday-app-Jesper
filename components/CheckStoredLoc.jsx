import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function checkStoredLocation() {
    const [storedOrNot, setStoredOrNot] = useState(false);

    const data = [
        { key: '1', value: 'Middle' },
        { key: '2', value: 'North' },
        { key: '3', value: 'South' },
    ];

    useEffect(() => {
        const init = async () => {
            const saved = await AsyncStorage.getItem('region');
            if (saved) {
                setStoredOrNot(data[Number(saved)].value);
            } else {
                setStoredOrNot(false);
            }
        };
        init();
    }, []);

    return storedOrNot;
}