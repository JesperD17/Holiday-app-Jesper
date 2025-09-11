import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { RegionProvider } from '@/components/RegionContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const global = GlobalStyles(insets);

  return (
    <SafeAreaProvider style={{ paddingBottom: insets.bottom, backgroundColor: 'grey' }}>
      <RegionProvider >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: 'absolute',
                height: 'auto',
                padding: 10
              },
              android: {
                paddingTop: 10,
                paddingBottom: 10,
                height: 75,
                backgroundColor: '#E9E9E9',
                
              },
              default: {
                height: 75,
                padding: 10,
                backgroundColor: '#E9E9E9',
              },
              
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Thuis',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              tabBarItemStyle: global.hidden,
            }}
          />
          <Tabs.Screen
            name="holidays"
            options={{
              title: `Vakanties`,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="info" color={color} />,
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: 'Over ons',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="message" color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Instellingen',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="setting" color={color} />,
            }}
          />
        </Tabs>
      </RegionProvider>
    </SafeAreaProvider>
  );
}