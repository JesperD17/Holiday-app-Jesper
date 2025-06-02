import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Text, View } from 'react-native';

import CurrentLoc from '../../components/GetLocation';

export default function SettingScreen() {


    return (
        <View>
            <Link href='/' style={GlobalStyles.headers}>
                <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
                Setting's
            </Link>
            
            <Text style={GlobalStyles.default}>
                <CurrentLoc />
            </Text>
        </View>
    );
}