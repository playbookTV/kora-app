import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTransactionStore } from '../store/transaction-store';
import TransactionList from '../components/TransactionList';

export default function HomeScreen() {
  const router = useRouter();
  const { safeSpendToday, daysToPayday } = useTransactionStore();

  // Temporary: Initialize safe spend if 0 (mock calculation for now, just to show something)
  // In real app, this would happen in Onboarding or backend sync
  const { updateSafeSpend } = useTransactionStore();
  useEffect(() => {
     if (safeSpendToday === 0) {
         // Default seed
         // updateSafeSpend(5400, 8); // Let's not overwrite if 0, maybe user has 0.
         // Actually, if it's 0 it might look like a bug to the user right now.
         // Let's leave it as is, or maybe show "Calculating..." if onboarding just finished.
     }
  }, []);

  const handleMicPress = () => {
      router.push('/voice-session');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.screenBG }}>
      <StatusBar style="dark" />
      
      {/* Main Container */}
      <View flex padding-page>
        
        {/* Top Spacer */}
        <View height={40} />

        {/* Center Content: Safe Spend */}
        <View center marginB-s8>
          <Text small textMuted marginB-s2 style={{ letterSpacing: 1.5 }}>
            SAFE SPEND TODAY
          </Text>
          <Text h1 textDefault>
            ₦{safeSpendToday.toLocaleString()}
          </Text>
          <Text body textMuted marginT-s3>
            {daysToPayday} days to payday
          </Text>
        </View>

        {/* Transaction History (Scrollable Area) */}
        <View flex>
            <TransactionList />
        </View>

        {/* Interaction Area */}
        <View height={100} row bottom spread>
          {/* Add Manual Transaction Button (Left) */}
          <TouchableOpacity 
            padding-s4
            style={{ alignSelf: 'flex-end', marginBottom: 20 }}
            onPress={() => router.push('/add-transaction')}
          >
             <Feather name="plus" size={24} color={Colors.textDefault} />
          </TouchableOpacity>

          {/* Mic Button (Center) */}
          <View centerH style={{ position: 'absolute', left: 0, right: 0, bottom: 20 }} pointerEvents="box-none">
            <TouchableOpacity
              bg-primary
              center
              style={{ width: 80, height: 80, borderRadius: 40 }}
              activeOpacity={0.8}
              onPress={handleMicPress}
            >
              <Feather name="mic" size={32} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>

          {/* Settings Button (Right) */}
           <TouchableOpacity 
            padding-s4
            style={{ alignSelf: 'flex-end', marginBottom: 20 }} 
            onPress={() => router.push('/settings')}
          >
             <Feather name="settings" size={24} color={Colors.textDefault} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
