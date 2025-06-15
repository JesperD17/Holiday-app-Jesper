import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import CurrentLoc from '@/components/GetLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutScreen() {
    const insets = useSafeAreaInsets();
    const global = GlobalStyles(insets);

    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    const portraitHeight = isPortrait
        ? (Platform.OS === 'android' ? 400 : height * 0.55) // portrait
        : (Platform.OS === 'android' ? 125 : height * 0.3); // landscape

    return (
        <View style={global.uiPaddingPages}>
            <ScrollView>
                <Link href='/' asChild>
                    <Pressable style={global.headers}>
                        <IconSymbol size={28} name="left.arrow" style={global.icons} />
                        <Text style={global.headerSize}>
                            About
                        </Text>
                    </Pressable>
                </Link>

                <View style={global.default}>
                    <Text>
                        <CurrentLoc />
                    </Text>
                    <View style={[styles.wrapper, { height: portraitHeight }]}>
                        <Image
                            source={require('@/assets/images/dev-black.png')}
                            style={styles.img}
                        />
                        <Link href='https://github.com/JesperD17/Holiday-app-Jesper'
                            target="_blank"
                            style={styles.text}>
                            ℗ 2025 Jesper Drent
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
        top: '50vh'
    },

    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
        margin: 10
    },

    text: {
        color: 'black',
        textDecorationLine: 'underline',
    }
})