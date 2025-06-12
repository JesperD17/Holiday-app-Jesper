import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import CurrentLoc from '@/components/GetLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutScreen() {
    const insets = useSafeAreaInsets();
    const global = GlobalStyles(insets);

    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

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
                    <View style={[styles.wrapper]}>
                        <Image
                            source={require('@/assets/images/dev-black.png')}
                            style={styles.img}
                        />
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>
                                About This App{"\n"}
                            </Text>
                            Deltion Holiday App{"\n"}
                            Version: 1.0{"\n"}
                            Last updated: 7 June 2025{"\n"}
                            This app was developed as an individual project for Deltion College. It displays upcoming Dutch school holidays based on your current location or a manually selected region.{"\n"}{"\n"}

                            <Text style={{ fontWeight: "bold" }}>
                                Copyright & License{"\n"}
                            </Text>
                            <Link href='https://github.com/JesperD17/Holiday-app-Jesper'
                                target="_blank"
                                style={styles.text}>
                                © 2025 Jesper Drent. All rights reserved.{"\n"}
                            </Link>
                            This application was created for educational purposes. Reuse of the source code is permitted for learning and non-commercial use. For commercial use or redistribution, please contact the developer.{"\n"}{"\n"}

                            <Text style={{ fontWeight: "bold" }}>
                                Data Sources{"\n"}
                            </Text>
                            Holiday data is retrieved from the official
                            <Link href='https://opendata.rijksoverheid.nl'
                                target="_blank"
                                style={[styles.text, { paddingLeft: 3 }]}>
                                Dutch government API{"\n"}
                            </Link>
                            Icons and images used in this app are either:{"\n"}
                            • Custom-designed by the developer, or{"\n"}
                            • Sourced from open-source icon libraries such as FontAwesome, Material Icons, or Freepik, with attribution where required.{"\n"}{"\n"}

                            <Text style={{ fontWeight: "bold" }}>
                                Contact{"\n"}
                            </Text>
                            Name: Jesper Drent{"\n"}
                            Email: drenzo.dev@gmail.com{"\n"}
                            School: Deltion College{"\n"}
                            Class: SD2A
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
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