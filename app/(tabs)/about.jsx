import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Image, StyleSheet, View } from 'react-native';

import { Platform } from 'react-native';
import CurrentLoc from '../../components/GetLocation';

export default function AboutScreen() {
    return (
        <View>
            <Link href='/' style={GlobalStyles.headers}>
                <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
                About
            </Link>

            <View style={GlobalStyles.default}>
                <CurrentLoc />
                <View style={styles.wrapper}>
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
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: (Platform.OS === 'android') ? 400 : '55vh',
        flexDirection: 'column',
        gap: 10,
    },

    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },

    text: {
        color: 'black',
        textDecorationLine: 'underline'
    }
})