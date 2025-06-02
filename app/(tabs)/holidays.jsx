
import { Collapsible } from '@/components/Collapsible';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Text } from 'react-native';
import CurrentLoc from '../../components/GetLocation';

export default function HolidayScreen() {
  return (
    <>
      <Link href='/' style={GlobalStyles.headers}>
        <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
        Holiday's
      </Link>

      <Text style={GlobalStyles.default}>
        <CurrentLoc />
        <Collapsible title="collapsible content">
          <>text</>
        </Collapsible>
      </Text>
    </>
  );
}
