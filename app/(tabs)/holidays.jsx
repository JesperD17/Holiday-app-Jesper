import useFetchHolidays from '@/components/fetchHolidays';
import useCurrentLoc from '@/components/GetLocation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useYear } from '@/components/YearContext';
import { yearsJson } from "@/constants/GlobalJson";
import { GlobalStyles } from '@/constants/GlobalStyles';
import { FontAwesome } from "@expo/vector-icons";
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HolidayScreen() {
  const insets = useSafeAreaInsets();
  const global = GlobalStyles(insets);

  const { width, height } = useWindowDimensions();
  const isPortrait = height <= width;
  
  const currentLoc = useCurrentLoc();
  const { year, updateYear } = useYear();
  const { fetchHolidays, computeRegionKey, isLoading, holidays, years } = useFetchHolidays();

  const today = new Date();
  const yearDefault = `${today.getFullYear()}-${today.getFullYear()+1}`;

  useEffect(() => {
    if (currentLoc === 'Laden...') return;
    const regionKey = computeRegionKey(currentLoc);
    fetchHolidays(year || yearDefault, regionKey);
  }, [currentLoc, year]);

  return (
    <View style={global.uiPaddingPages}>
      <ScrollView>
        <Link href='/' asChild>
          <Pressable style={global.headers}>
            <IconSymbol size={28} name="left.arrow" style={global.icons} />
            <Text style={global.headerSize}>
              Vakanties
            </Text>
          </Pressable>
        </Link>

        { isLoading ? 
          <View style={[{ paddingVertical: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }, styles.absoluteOverlay]}>
            <ActivityIndicator size="large" />
          </View> : 
          <></>
        }

        <View style={global.default}>
          <Text>
            {currentLoc || 'Laden...'}
          </Text>

          <SelectList
            setSelected={(val) => updateYear(val)}
            data={yearsJson}
            save="value"
            arrowicon={<FontAwesome name="chevron-down" size={12} color="black" />}
            search={false}
            boxStyles={{
                borderRadius: 8
            }}
            placeholder="Kies een schooljaar"
          />

          <Text style={{ fontWeight: 'bold' }}>
            {years || ''}
          </Text>

          <View style={[isPortrait && styles.portraitWrapper]}>
            {holidays.map((item, index) => (
              <View key={index.toString()} style={[styles.holidayAligment, isPortrait && styles.portraitBox]}>
                <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
                <Text>Start: {item.startDate || 'N/A'}</Text>
                <Text>Eind: {item.endDate || 'N/A'}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  holidayAligment: {
    marginTop: 10,
    padding: 10,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 12,
  },
  
  portraitWrapper: {
    overflow: 'unset',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  portraitBox: {
    width: '48%',
  },

  absoluteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  }
})