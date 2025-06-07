import { Platform } from "react-native";

export const GlobalStyles = (insets) => ({
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
    gap: 10,
    flexDirection: 'column',
    flex: 1
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

  uiPaddingPages: {
    paddingLeft: insets.left,
    paddingRight: insets.right,
    flex: 1,
  }
})