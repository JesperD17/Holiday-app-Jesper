import { useRegion } from "@/components/RegionContext";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function useCurrentLoc() {
  const { region } = useRegion();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    }
    getCurrentLocation();
  }, []);

  let text = "Waiting...";

  if (!region) {
    console.log('a', region)
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      const { latitude } = location.coords;
      if (latitude > 53.0) {
        text = "Region: North";
      } else if (latitude >= 51.8) {
        text = "Region: Middle";
      } else {
        text = "Region: South";
      }
    }
  } else {
    text = region;
  }

  return text += 'aa';
}
