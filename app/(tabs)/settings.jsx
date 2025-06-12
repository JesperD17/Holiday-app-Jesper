import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from "expo-router";
import { Pressable, Text } from 'react-native';

import CurrentLoc from '@/components/GetLocation';
import { FontAwesome } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const global = GlobalStyles(insets);

    const data = [
        { key: '1', value: 'Middle' },
        { key: '2', value: 'North' },
        { key: '3', value: 'South' },
    ];

    const [selected, setSelected] = useState("");
    const [userChanged, setUserChanged] = useState(false);

    // Load stored selection or set based on CurrentLoc
    useEffect(() => {
        const init = async () => {
            const saved = await AsyncStorage.getItem('region');
            if (saved) {
                console.log('a');
                
                setSelected(saved);
            } else {
                console.log('b');

                const current = await CurrentLoc(); // Ensure this returns a promise resolving to the region name
                setSelected(current);
            }
        };
        init();
    }, []);

    // Save to AsyncStorage only if user changed
    useEffect(() => {
        const saveToStorage = async () => {
            if (userChanged) {
                console.log(AsyncStorage, 'a');

                await AsyncStorage.setItem('region', selected);
            }
        };
        saveToStorage();
    }, [selected, userChanged]);

    const handleUserSelect = (val) => {
        setSelected(val);
        setUserChanged(true);
    };

    return (
        <View style={global.uiPaddingPages}>
            <Link href='/' asChild>
                <Pressable style={global.headers}>
                    <IconSymbol size={28} name="left.arrow" style={global.icons} />
                    <Text style={global.headerSize}>Setting's</Text>
                </Pressable>
            </Link>

            <Text style={global.default}>
                <SelectList
                    setSelected={handleUserSelect}
                    data={data}
                    value={selected}
                    arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                    search={false}
                    boxStyles={{ borderRadius: 8 }}
                    defaultOption={data.find(d => d.value === selected)}
                />
            </Text>
        </View>
    );
}
