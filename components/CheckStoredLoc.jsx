import data from "@/constants/RegionData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function useStoredLocation() {
    const [storedLoc, setStoredLoc] = useState(null);

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