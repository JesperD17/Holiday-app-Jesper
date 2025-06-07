import CurrentLoc from '@/components/GetLocation';
import { GlobalStyles } from '@/constants/Global';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const global = GlobalStyles(insets);
  return (
    <View style={global.uiPaddingPages}>
      <View style={global.headers}>
        <Text style={global.headerSize}>
          Countdown
        </Text>
      </View>

      <View style={global.default}>
        <Text>
          <CurrentLoc />
        </Text>
        <Text>
          text
        </Text>
      </View>
    </View>
  );
}   
