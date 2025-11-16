import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const RegionContext = createContext();

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const loadRegion = async () => {
      const saved = await AsyncStorage.getItem("region");
      if (saved) setRegion(saved);
    };
    loadRegion();
  }, []);

  const updateRegion = async (newRegion) => {
    setRegion(newRegion);
    await AsyncStorage.setItem("region", newRegion);
  };

  return (
    <RegionContext.Provider value={{ region, updateRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
