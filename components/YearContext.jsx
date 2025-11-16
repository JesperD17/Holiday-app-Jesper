import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const YearContext = createContext();

export function YearProvider({ children }) {
  const [year, setYear] = useState(null);

  useEffect(() => {
    const loadYear = async () => {
      const saved = await AsyncStorage.getItem("year");
      if (saved) setYear(saved);
    };
    loadYear();
  }, []);

  const updateYear = async (newYear) => {
    setYear(newYear);
    await AsyncStorage.setItem("year", newYear);
  };

  return (
    <YearContext.Provider value={{ year, updateYear }}>
      {children}
    </YearContext.Provider>
  );
}

export function useYear() {
  return useContext(YearContext);
}
