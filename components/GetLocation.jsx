import { useRegion } from "@/components/RegionContext";
import { regionsJson } from "@/constants/GlobalJson";
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
        setErrorMsg("Toegang tot de locatie is geweigerd");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    }
    getCurrentLocation();
  }, []);

  let text = "Laden...";

  if (!region) {
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      const { latitude } = location.coords;
      if (latitude > 53.0) {
        text = "Regio: Noord";
      } else if (latitude >= 51.8) {
        text = "Regio: Midden";
      } else {
        text = "Regio: Zuid";
      }
    }
  } else {
    const regionObj = regionsJson.find(item => item.key === String(region));
    text = `Regio: ${regionObj?.value || region}`;
  }
  return text;
}
