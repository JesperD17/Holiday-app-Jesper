import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Pressable, Text } from 'react-native';

import CurrentLoc from '@/components/GetLocation';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const global = GlobalStyles(insets);

    return (
        <View style={global.uiPaddingPages}>
            <Link href='/' asChild>
                <Pressable style={global.headers}>
                    <IconSymbol size={28} name="left.arrow" style={global.icons} />
                    <Text style={global.headerSize}>
                        Setting's
                    </Text>
                </Pressable>
            </Link>

            <Text style={global.default}>
                <CurrentLoc />
            </Text>
        </View>
    );
}