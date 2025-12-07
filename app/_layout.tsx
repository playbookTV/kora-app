import { Stack, useRouter, useSegments } from 'expo-router';
// import { Provider } from 'react-native-ui-lib'; // Removed due to lint error
import '../constants/design-system'; // Initialize Design System
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useUserStore } from '../store/user-store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // Load any custom fonts here if needed
    // 'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  const { hasOnboarded } = useUserStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const inOnboardingGroup = segments[0] === 'onboarding';

    if (!hasOnboarded && !inOnboardingGroup) {
      // Redirect to onboarding if not onboarded
      router.replace('/onboarding');
    } else if (hasOnboarded && inOnboardingGroup) {
      // Redirect to home if already onboarded
      router.replace('/');
    }
  }, [hasOnboarded, segments, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="voice-session" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="add-transaction" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}
