
import { Collapsible } from '@/components/Collapsible';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Text, View } from 'react-native';
import CurrentLoc from '../../components/GetLocation';

export default function HolidayScreen() {
  return (
    <View>
      <Link href='/' style={GlobalStyles.headers}>
        <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
        <Text>
          Holiday's
        </Text>
      </Link>

      <View style={GlobalStyles.default}>
        <CurrentLoc />
        <Collapsible title="collapsible content">
          <Text>
            text
          </Text>
        </Collapsible>
      </View>
    </View>
  );
}
