import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUserStore } from '../../store/user-store';
import { useTransactionStore } from '../../store/transaction-store';
import { AIService } from '../../services/ai-service';

// Steps in the Voice Onboarding
type OnboardingStep = 'INTRO' | 'INCOME' | 'EXPENSES' | 'BALANCE_PAYDAY' | 'COMPLETE';

export default function OnboardingChat() {
  const router = useRouter();
  const { setIncome, addFixedExpense, setPayday, completeOnboarding } = useUserStore();
  const { setBalance, recalculateSafeSpend } = useTransactionStore();

  const [step, setStep] = useState<OnboardingStep>('INTRO');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [koraText, setKoraText] = useState("Hi, I'm Kora. Pause. Breathe. I'm here to help you spend better. Let's get set up.");
  
  // Audio Refs
  const recording = useRef<Audio.Recording | null>(null);
  const sound = useRef<Audio.Sound | null>(null);

  // Initial greeting
  useEffect(() => {
    handleKoraSpeak("Hi, I'm Kora. Pause. Breathe. I'm here to help you spend better. First, tell me: how much money comes in each month?");
    setStep('INCOME');
  }, []);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording: newRecording } = await Audio.Recording.createAsync( 
         Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recording.current = newRecording;
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    setIsProcessing(true);
    
    if (!recording.current) return;
    
    let uri = recording.current.getURI();
    await recording.current.stopAndUnloadAsync();
    // Sometimes getURI is null after stop, so we grab it before or check docs. 
    // Actually, getURI() should work. If not, we might need to rely on the file system location known from createAsync if we set it.
    // For now, assume it works or grab it before stop if needed. 
    // Wait, createAsync returns it on the recording object.
    
    if (!uri) {
        // Fallback or retry
        uri = recording.current.getURI();
    }
    
    console.log('Recording stored at', uri);

    if (uri) {
      processUserAudio(uri);
    } else {
        setIsProcessing(false);
    }
  };

  const processUserAudio = async (uri: string) => {
    try {
      // 1. Transcribe
      const text = await AIService.transcribe(uri);
      console.log('Transcribed:', text);

      // 2. Intelligence
      const response = await AIService.generateResponse(text, { step });
      console.log('AI Response:', response);

      // 3. Action Handling
      if (response.data) {
        handleDataExtraction(response.data);
      }

      // 4. Speak Response
      setKoraText(response.text);
      await handleKoraSpeak(response.text);
      setIsProcessing(false);

    } catch (error) {
      console.error(error);
      setKoraText("I didn't quite catch that. Could you say it again?");
      setIsProcessing(false);
    }
  };

  const handleDataExtraction = (data: any) => {
    switch (step) {
      case 'INCOME':
        if (data.amount) {
          setIncome(data.amount);
          setStep('EXPENSES');
        }
        break;
      case 'EXPENSES':
        if (data.fixed_expenses && Array.isArray(data.fixed_expenses)) {
          data.fixed_expenses.forEach((ex: any) => addFixedExpense(ex.name, ex.amount));
          setStep('BALANCE_PAYDAY');
        }
        break;
      case 'BALANCE_PAYDAY':
        if (data.balance) setBalance(data.balance);
        if (data.payday) setPayday(data.payday);
        
        if (data.balance && data.payday) {
            setStep('COMPLETE');
            // Recalculate Safe Spend based on all collected data
            recalculateSafeSpend();
            completeOnboarding();
            setTimeout(() => router.replace('/'), 3000);
        }
        break;
    }
  };

  const handleKoraSpeak = async (text: string) => {
    // Stop any current sound
    if (sound.current) {
        await sound.current.unloadAsync();
    }

    const audioUri = await AIService.speak(text);
    if (audioUri) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
        sound.current = newSound;
        await newSound.playAsync();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.screenBG }}>
      {/* Visualizer Area */}
      <View flex center style={{ paddingHorizontal: 20 }}>
        {/* Kora's Bubble */}
        <View bg-grey70 padding-20 br40 style={{ maxWidth: '90%' }}>
            <Text h3 center>{koraText}</Text>
        </View>

        {/* Dynamic Visualizer (Placeholder) */}
        <View marginT-50 height={100} width={100} bg-primary br100 style={{ opacity: isRecording ? 1 : 0.2 }} />
      </View>

      {/* Controls */}
      <View padding-page bottom centerH>
        {isProcessing ? (
            <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
            <TouchableOpacity
                bg-primary
                center
                style={{ width: 80, height: 80, borderRadius: 40 }}
                onPressIn={handleStartRecording}
                onPressOut={handleStopRecording}
                activeOpacity={0.8}
            >
                <Feather name={isRecording ? "mic-off" : "mic"} size={32} color={Colors.textInverse} />
            </TouchableOpacity>
        )}
        <Text marginT-10 textMuted small>
            {isRecording ? "Listening..." : "Hold to Speak"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
