// SettingsScreen.jsx
import CurrentLoc from '@/components/GetLocation';
import { useRegion } from "@/components/RegionContext";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { GlobalStyles } from "@/constants/Global";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const global = GlobalStyles(insets);

    const { region, updateRegion } = useRegion();

    const data = [
        { key: "1", value: "Middle" },
        { key: "2", value: "North" },
        { key: "3", value: "South" },
    ];

    return (
        <View style={global.uiPaddingPages}>
            <Link href="/" asChild>
                <Pressable style={global.headers}>
                    <IconSymbol size={28} name="left.arrow" style={global.icons} />
                    <Text style={global.headerSize}>Setting's</Text>
                </Pressable>
            </Link>


            <Text style={global.default}>
                <CurrentLoc />
                <SelectList
                    setSelected={updateRegion}
                    data={data}
                    save="value"
                    defaultOption={data.find((d) => d.value === region)}
                    arrowicon={<FontAwesome name="chevron-down" size={12} color="black" />}
                    search={false}
                    boxStyles={{ borderRadius: 8 }}
                />
            </Text>
        </View>
    );
}
