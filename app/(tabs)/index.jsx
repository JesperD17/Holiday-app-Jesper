import CurrentLoc from '@/components/GetLocation';
import { GlobalStyles } from '@/constants/Global';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={GlobalStyles.headers}>
        <Text style={GlobalStyles.headerSize}>
          Countdown
        </Text>
      </View>

      <View style={GlobalStyles.default}>
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
