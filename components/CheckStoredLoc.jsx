// CheckStoredLoc.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function useStoredLocation() {
    const [storedLoc, setStoredLoc] = useState(null);

    const data = [
        { key: '1', value: 'Middle' },
        { key: '2', value: 'North' },
        { key: '3', value: 'South' },
    ];

    useEffect(() => {
        const init = async () => {
            const saved = await AsyncStorage.getItem('region');
            if (saved) {
                // saved is a string (e.g. "1"), so map to your data array correctly
                const found = data.find(d => d.key === saved);
                setStoredLoc(found ? found.value : null);
            } else {
                setStoredLoc(null);
            }
        };
        init();
    }, []);

    return storedLoc;
}