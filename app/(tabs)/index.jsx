import useFetchHolidays from '@/components/fetchHolidays';
import useCurrentLoc from '@/components/GetLocation';
import { parseDutchDate } from '@/components/ParseMonths';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const global = GlobalStyles(insets);

  let [nearestHoliday, setNearestHoliday] = useState(null);
  let [daysUntilNearestHoliday, setDaysUntilNearestHoliday] = useState(null);

  const today = new Date();
  const yearDefault = `${today.getFullYear()}-${today.getFullYear() + 1}`;

  const currentLoc = useCurrentLoc();
  const { fetchHolidays, computeRegionKey, isLoading, holidays, years } = useFetchHolidays();

  const { width, height } = useWindowDimensions();
  const isLandscape = height <= width;

  let landScapeStyle = '';

  if (isLandscape) {
    landScapeStyle = { flexDirection: 'column-reverse',  };
  }

  useEffect(() => {
    if (currentLoc === 'Laden...') return;
    const regionKey = computeRegionKey(currentLoc);
    fetchHolidays(yearDefault, regionKey);
  }, [currentLoc, yearDefault]);

  useEffect(() => {
    if (!holidays || holidays.length === 0) {
      setNearestHoliday(null);
      setDaysUntilNearestHoliday(null);
      return;
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const MS_PER_DAY = 1000 * 3600 * 24;

    const upcoming = holidays
      .map(holiday => ({ ...holiday, parsedStart: parseDutchDate(holiday.startDate) }))
      .filter(holiday => holiday.parsedStart instanceof Date && !isNaN(holiday.parsedStart) && holiday.parsedStart.getTime() >= todayStart.getTime())
      .sort((a, b) => a.parsedStart.getTime() - b.parsedStart.getTime());

    const nearest = upcoming[0] || null;
    setNearestHoliday(nearest);

    if (nearest) {
      const timeDiff = nearest.parsedStart.getTime() - todayStart.getTime();
      const daysDiff = Math.ceil(timeDiff / MS_PER_DAY);
      setDaysUntilNearestHoliday(daysDiff);
    } else {
      setDaysUntilNearestHoliday(null);
    }
  }, [holidays, isLoading]);

  return (
    <View style={global.uiPaddingPages}>
      <ScrollView>
        <View style={global.headers}>
          <Text style={global.headerSize}>
            Aftellen
          </Text>
        </View>

        <View style={[global.default, landScapeStyle]}>
          <Text>
            {currentLoc || 'Laden...'}
          </Text>
          <View>
            {nearestHoliday?.type === 'Herfstvakantie'
              ? <Image style={styles.image} source={require('../../assets/images/autumn-holiday.jpg')} />
              : nearestHoliday?.type === 'Kerstvakantie'
                ? <Image style={styles.image} source={require('../../assets/images/christmas-holiday.jpg')} />
                : nearestHoliday?.type === 'Voorjaarsvakantie'
                  ? <Image style={styles.image} source={require('../../assets/images/spring-holiday.jpg')} />
                  : nearestHoliday?.type === 'Meivakantie'
                    ? <Image style={styles.image} source={require('../../assets/images/may-holiday.jpg')} />
                    : nearestHoliday?.type === 'Zomervakantie'
                      ? <Image style={styles.image} source={require('../../assets/images/summer-holiday.jpg')} />
                      : null}
          </View>
          <Text style={[global.headerSize, styles.titleDefault]}>
            {daysUntilNearestHoliday} dagen tot de {isLoading ? 'laden...' : nearestHoliday ? `${nearestHoliday.type ?? 'geen naam'}` : 'geen komende vakanties'}
          </Text>
          <Text>
            {isLoading ? 'laden...' : nearestHoliday ? `${nearestHoliday.startDate ?? 'onbekende dagen'} — ${nearestHoliday.endDate ?? 'onbekende dagen'}` : 'geen komende vakanties'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    objectFit: 'cover',
  },

  titleDefault: {
    fontSize: 25,
    width: '100%',
    textAlign: 'center',
  },
});