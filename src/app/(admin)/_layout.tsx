import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme].background,
        paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
      }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.background,
          tabBarInactiveTintColor: 'gainsboro',
          tabBarStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}>
        
        <Tabs.Screen name="index" options={{ href: null }} />

        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="cutlery" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
