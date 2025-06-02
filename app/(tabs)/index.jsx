import { GlobalStyles } from '@/constants/Global';
import { Text, View } from 'react-native';
import CurrentLoc from '../../components/GetLocation';

export default function HomeScreen() {
  return (
    <View>
      <Text style={GlobalStyles.headers}>
        Countdown
      </Text>

      <View style={GlobalStyles.default}>
        <CurrentLoc />
        <Text>text</Text>
      </View>
    </View>

  );
}   
