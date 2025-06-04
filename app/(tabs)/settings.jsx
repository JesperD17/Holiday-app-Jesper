import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Pressable, Text, View } from 'react-native';

import CurrentLoc from '@/components/GetLocation';

export default function SettingScreen() {


    return (
        <View style={{ flex: 1 }}>
            <Link href='/' asChild>
                <Pressable style={GlobalStyles.headers}>
                    <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
                    <Text style={GlobalStyles.headerSize}>
                        Setting's
                    </Text>
                </Pressable>
            </Link>

            <Text style={GlobalStyles.default}>
                <CurrentLoc />
            </Text>
        </View>
    );
}