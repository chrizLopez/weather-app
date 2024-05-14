import HomeBackground from './src/components/HomeBackground';
import WeatherInfo from './src/components/section/WeatherInfo';
import WeatherTabBar from './src/components/tabBar/WeatherTabBar';
import { currentWeather } from './src/data/CurrentWeather';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ForecastSheet from './src/components/sheets/ForecastSheet';
import Home from './src/screens/Home';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontIsLoaded] = useFonts({
    'SF-Thin': require('./assets/fonts/SF-Pro-Display-Thin.otf'),
    'SF-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontIsLoaded]);

  if (!fontIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Home />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}