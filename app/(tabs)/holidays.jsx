
import { Collapsible } from '@/components/Collapsible';
import CurrentLoc from '@/components/GetLocation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Text, View } from 'react-native';

export default function HolidayScreen() {
  return (
    <View>
      <Link href='/' asChild>
        <View style={GlobalStyles.headers}>
          <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
          <Text style={GlobalStyles.headerSize}>
            Holiday's
          </Text>
        </View>
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
