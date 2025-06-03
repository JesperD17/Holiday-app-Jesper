
import { Collapsible } from '@/components/Collapsible';
import CurrentLoc from '@/components/GetLocation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GlobalStyles } from '@/constants/Global';
import { Link } from 'expo-router';

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';


export default function HolidayScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2024-2025?output=json');
        const json = await response.json();
        setData(json.content.vacations);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <View>
      <Link href='/' asChild>
        <Pressable style={GlobalStyles.headers}>
          <IconSymbol size={28} name="left.arrow" style={GlobalStyles.icons} />
          <Text style={GlobalStyles.headerSize}>
            Holiday's
          </Text>
        </Pressable>
      </Link>

      <View style={GlobalStyles.default}>
        <CurrentLoc />
        <Collapsible title="collapsible content">
          <Text>
            text
          </Text>
        </Collapsible>

        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 18, marginBottom: 12 }}>
                {item.regions.region}, {item.regions.startdate}
              </Text>
            )}
          />
        </View>

      </View>
    </View>
  );
}