import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './login';
import RegisterScreen from './register';
import TabLayout from './(tabs)/_layout';
import NotFoundScreen from './+not-found';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

   // Función para manejar el inicio de sesión
   const handleLogin = () => {
    // Aquí iría la lógica de inicio de sesión, por ejemplo, setIsLoggedIn(true);
    setIsLoggedIn(true);
  };

  if (!loaded) {
    return null;
  }

  // Si el usuario no está autenticado, muestra la vista de inicio de sesión
  if (!isLoggedIn) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen name="login">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" component={NotFoundScreen} />
          </Stack.Navigator>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
}

  // Si el usuario está autenticado, muestra las pantallas de navegación
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}>
            {(props) => <TabLayout {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="+not-found" component={NotFoundScreen} />
        </Stack.Navigator>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
