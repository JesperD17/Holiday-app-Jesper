import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Text } from 'react-native';

export default function CurrentLoc() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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

    return (
        <Text>
            {text}
        </Text>
    );
}