import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-web';

export default function AboutScreen() {
    return (
        <>
            <Link href='/' style={GlobalStyles.headers}>
                <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
                About
            </Link>

            <div style={GlobalStyles.default}>
                <div style={styles.wrapper}>
                    <Image
                        source={require('@/assets/images/dev-black.png')}
                        style={styles.img}
                    />
                    <a href='https://github.com/JesperD17/Holiday-app-Jesper'
                    target="_blank"
                    style={styles.text}>
                        ℗ 2025 Jesper Drent
                    </a>
                </div>
            </div>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        flexDirection: 'column',
        gap: 10,
    },

    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },

    text: {
        color: 'black'
    }
})