import React from 'react';
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingWelcome() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/chat');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.screenBG }}>
      <StatusBar style="dark" />
      
      <View flex center padding-page>
        <Text h1 center marginB-s4 style={{ letterSpacing: -1 }}>
          Kora.
        </Text>
        
        <Text h2 center marginB-s8 textMuted style={{ fontWeight: '400' }}>
          Pause. Breathe.{'\n'}Spend better.
        </Text>

        <TouchableOpacity 
            bg-primary 
            center 
            paddingV-s4 
            paddingH-s8 
            br40
            onPress={handleStart}
            activeOpacity={0.8}
            style={{ width: '100%', maxWidth: 300 }}
        >
            <Text textInverse body style={{ fontWeight: '600' }}>
                Get Started
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
