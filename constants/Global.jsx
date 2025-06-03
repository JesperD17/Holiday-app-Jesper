import { Platform } from "react-native";
export const GlobalStyles = {
  headers: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    fontSize: 25,
    marginTop: (Platform.OS === 'android') ? 30 : 0,
    
  },

  default: {
    display: 'flex',
    margin: 10,
    flexDirection: 'column'
  },

  icons: {
    fontSize: 40
  },

  hidden: {
    display: 'none'
  },
};