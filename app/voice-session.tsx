import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUserStore } from '../store/user-store';
import { useTransactionStore } from '../store/transaction-store';
import { AIService } from '../services/ai-service';

export default function VoiceSession() {
  const router = useRouter();
  const { setBalance, updateSafeSpend, recalculateSafeSpend, currentBalance, daysToPayday } = useTransactionStore();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [koraText, setKoraText] = useState("I'm listening. What's on your mind?");
  
  const recording = useRef<Audio.Recording | null>(null);
  const sound = useRef<Audio.Sound | null>(null);

  // Auto-start recording on mount? Maybe not, let user tap.
  // Actually spec says "Single tap initiates voice input". If we navigated here, maybe auto-start?
  useEffect(() => {
      handleStartRecording();
      return () => {
          if (recording.current) recording.current.stopAndUnloadAsync();
      }
  }, []);

  const handleStartRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: newRecording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recording.current = newRecording;
      setIsRecording(true);
      setKoraText("Listening...");
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handleStopRecording = async () => {
    if (!recording.current) return;
    setIsRecording(false);
    setIsProcessing(true);
    await recording.current.stopAndUnloadAsync();
    const uri = recording.current.getURI();
    if (uri) processUserAudio(uri);
    else setIsProcessing(false);
  };

  const processUserAudio = async (uri: string) => {
    try {
      const text = await AIService.transcribe(uri);
      
      // Context for Mistral
      const context = {
          mode: 'GENERAL',
          currentBalance,
          daysToPayday
      };

      const response = await AIService.generateResponse(text, context);
      
      if (response.data) {
          // Handle updates if AI decides to update safe spend or balance
          if (response.data.safeSpend) {
              updateSafeSpend(response.data.safeSpend, response.data.days || daysToPayday);
          } else if (response.data.action === 'SAFE_SPEND_UPDATE') {
              // If generic update signal, force recalculation
              recalculateSafeSpend();
          }
      }

      setKoraText(response.text);
      await handleKoraSpeak(response.text);
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
      setKoraText("I struggled to hear that.");
      setIsProcessing(false);
    }
  };

  const handleKoraSpeak = async (text: string) => {
    if (sound.current) await sound.current.unloadAsync();
    const audioUri = await AIService.speak(text);
    if (audioUri) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
        sound.current = newSound;
        await newSound.playAsync();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.screenBG }}>
      <View flex center padding-page>
         <View bg-grey70 padding-20 br40 style={{ maxWidth: '90%' }}>
            <Text h3 center>{koraText}</Text>
        </View>

        <View marginT-50 height={100} width={100} bg-primary br100 style={{ opacity: isRecording ? 1 : 0.2 }} />
      </View>

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
             >
                <Feather name={isRecording ? "mic-off" : "mic"} size={32} color={Colors.textInverse} />
             </TouchableOpacity>
        )}
        <TouchableOpacity marginT-20 onPress={() => router.back()}>
            <Text textMuted>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
