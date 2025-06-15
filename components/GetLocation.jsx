import checkStoredLocation from '@/components/CheckStoredLoc';
import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export default function useCurrentLoc() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const storedLoc = checkStoredLocation();

    useEffect(() => {

        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            setLocation(location);
        }
        getCurrentLocation();
    }, []);

    let text = 'Waiting...';

    console.log(storedLoc, 'aaaaa');
    
    if (storedLoc === false) {
        if (errorMsg) {
            text = errorMsg;
        } else if (location) {
            const { latitude, longitude } = location.coords;

            if (latitude > 53.0) {
                text = 'Region: North';
            } else if (latitude >= 51.8) {
                text = 'Region: Middle';
            } else {
                text = 'Region: South';
            }
        }
    } else {
        text = storedLoc;
    }

    return text;
}