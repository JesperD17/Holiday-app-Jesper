import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegionContext = createContext();

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(null);

  // Load region from storage at startup
  useEffect(() => {
    const loadRegion = async () => {
      const saved = await AsyncStorage.getItem("region");
      if (saved) setRegion(saved);
    };
    loadRegion();
  }, []);

  // Save to storage whenever region changes
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

// Hook for using region context
export function useRegion() {
  return useContext(RegionContext);
}
