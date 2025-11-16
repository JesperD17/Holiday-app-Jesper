import CurrentLoc from '@/components/GetLocation';
import { useRegion } from "@/components/RegionContext";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { regionsJson } from "@/constants/GlobalJson";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const global = GlobalStyles(insets);
    const { region, updateRegion } = useRegion();
    
    return (
        <View style={global.uiPaddingPages}>
            <ScrollView>
                <Link href="/" asChild>
                    <Pressable style={global.headers}>
                        <IconSymbol size={28} name="left.arrow" style={global.icons} />
                        <Text style={global.headerSize}>Instellingen</Text>
                    </Pressable>
                </Link>

                <View style={global.default}>
                    <Text>
                        <CurrentLoc/>
                    </Text>
                    <SelectList
                        setSelected={updateRegion}
                        data={regionsJson}
                        save="value"
                        defaultOption={regionsJson.find((d) => d.value === region)}
                        arrowicon={<FontAwesome name="chevron-down" size={12} color="black" />}
                        search={false}
                        boxStyles={{
                            // maxWidth: 400,
                            borderRadius: 8
                        }}
                        placeholder="Kies je regio"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
