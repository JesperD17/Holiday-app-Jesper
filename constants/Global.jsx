import { Platform } from "react-native";

export const GlobalStyles = {
  headers: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    marginTop: (Platform.OS === 'android') ? 40 : 10,
  },

  default: {
    display: 'flex',
    margin: 10,
    flexDirection: 'column'
  },

  icons: {
    fontSize: 40
  },

  headerSize: {
    fontSize: 25
  },

  hidden: {
    display: 'none'
  },
};