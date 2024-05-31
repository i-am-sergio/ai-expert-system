import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from '.';
import ChatboxScreen from './chatbox';
import ExploreScreen from './explore';
import SettingsScreen from './settings';

const Tab = createBottomTabNavigator();

// Definir los nombres de los íconos y sus variantes en una lista
const iconNames = [
  { route: 'index', focused: 'home', unfocused: 'home-outline' },
  { route: 'chatbox', focused: 'chatbox', unfocused: 'chatbox-outline' },
  { route: 'explore', focused: 'code-slash', unfocused: 'code-slash-outline' },
  { route: 'settings', focused: 'settings', unfocused: 'settings-outline' },
];

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Aquí obtenemos el esquema de color
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.text,
        // tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: { backgroundColor: colors.card },
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          // Encontrar el objeto correspondiente a la ruta actual
          const iconObject = iconNames.find(item => item.route === route.name);
          
          // Si no se encuentra el objeto, retornar null
          if (!iconObject) return null;

          // Obtener el nombre del ícono según el estado enfocado
          const iconName = focused ? iconObject.focused : iconObject.unfocused;

          // Renderizar el ícono
          return <TabBarIcon name={iconName} color="#0AF" />;
        },
      })}
    >
      <Tab.Screen name="index" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="chatbox" component={ChatboxScreen} options={{ title: 'Chatbox' }} />
      <Tab.Screen name="explore" component={ExploreScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
