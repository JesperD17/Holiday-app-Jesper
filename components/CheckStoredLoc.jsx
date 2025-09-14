import { regionsJson } from "@/constants/GlobalJson";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function useStoredLocation() {
    const [storedLoc, setStoredLoc] = useState(null);

    useEffect(() => {
        const init = async () => {
            const saved = await AsyncStorage.getItem('region');
            if (saved) {
                const found = regionsJson.find(d => d.key === saved);
                setStoredLoc(found ? found.value : null);
            } else {
                setStoredLoc(null);
            }
        };
        init();
    }, []);

    return storedLoc;
}