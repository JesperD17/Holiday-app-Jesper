
import useCurrentLoc from '@/components/GetLocation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { yearsJson } from "@/constants/GlobalJson";
import { GlobalStyles } from '@/constants/GlobalStyles';
import { FontAwesome } from "@expo/vector-icons";
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HolidayScreen() {
  const insets = useSafeAreaInsets();
  const global = GlobalStyles(insets);

  const { width, height } = useWindowDimensions();
  const isPortrait = height <= width;

  const [isLoading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(null);
  
  const currentLoc = useCurrentLoc();

  const today = new Date();
  const year = today.getFullYear();
  let yearReqHtml = `${year}-${year+1}`;

  const computeRegionKey = (loc) => {
    if (!loc || loc === 'Laden...') return 'heel Nederland';
    const parts = loc.split(" ");
    if (!parts[1]) return 'heel Nederland';
    return parts[1].charAt(0).toLowerCase() + parts[1].slice(1);
  };

  const fetchHolidays = async (newYearReq, regionKeyParam) => {
    const yearToUse = newYearReq || yearReqHtml;
    const regionKey = regionKeyParam || computeRegionKey(currentLoc);
    try {
      setLoading(true);
      const response = await fetch(`https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${yearToUse}?output=json`);
      const json = await response.json();
      const items = json?.content?.[0]?.vacations || [];
      const schoolyear = json?.content?.[0]?.schoolyear?.trim?.() || '';
      setYears(schoolyear);

      const enrichedData = items.map(item => {
        const startDateStr = getDateByRegion(item.regions, regionKey, 'startdate');
        const endDateStr = getDateByRegion(item.regions, regionKey, 'enddate');

        return {
          type: item.type.trim(),
          startDate: startDateStr ? new Date(startDateStr).toLocaleDateString('nl',
            { year: 'numeric', month: 'long', day: 'numeric' }) : '',
          endDate: endDateStr ? new Date(endDateStr).toLocaleDateString('nl',
            { year: 'numeric', month: 'long', day: 'numeric' }) : '',
        };
      });

      setHolidays(enrichedData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentLoc === 'Laden...') return;
    const regionKey = computeRegionKey(currentLoc);

    fetchHolidays(yearReqHtml, regionKey);
  }, [currentLoc]);

  useEffect(() => {
    if (!selectedYear) return;
    if (currentLoc === 'Laden...') return;
    const regionKey = computeRegionKey(currentLoc);
    fetchHolidays(selectedYear, regionKey);
  }, [selectedYear, currentLoc]);

  const getDateByRegion = (regions, regionKey, type) => {
    return (
      regions.find(r => r.region === regionKey)?.[type] ||
      regions.find(r => r.region === 'heel Nederland')?.[type] ||
      ''
    );
  };

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
            setSelected={(val) => setSelectedYear(val)}
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