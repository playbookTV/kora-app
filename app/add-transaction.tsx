
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTransactionStore } from '../store/transaction-store';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction, recalculateSafeSpend } = useTransactionStore();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
      const value = parseFloat(amount);
      if (isNaN(value) || value <= 0) return;
      if (!description.trim()) return;

      addTransaction(value, description, category || 'Manual');
      recalculateSafeSpend();
      router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.screenBG }}>
       <StatusBar style="dark" />
       
       <View padding-page>
           {/* Header */}
           <View row spread centerV marginB-s6>
               <TouchableOpacity onPress={() => router.back()}>
                   <Text textMuted>Cancel</Text>
               </TouchableOpacity>
               <Text h3>Add Expense</Text>
               <TouchableOpacity onPress={handleSave}>
                   <Text primary style={{ fontWeight: 'bold' }}>Save</Text>
               </TouchableOpacity>
           </View>

           {/* Form */}
           <View marginV-s4>
               <Text small textMuted marginB-s1>AMOUNT</Text>
               <TextInput
                   style={styles.inputLarge}
                   placeholder="0"
                   keyboardType="numeric"
                   autoFocus
                   value={amount}
                   onChangeText={setAmount}
                   placeholderTextColor={Colors.grey40}
               />
           </View>

           <View marginV-s4>
               <Text small textMuted marginB-s1>DESCRIPTION</Text>
               <TextInput
                   style={styles.input}
                   placeholder="What did you buy?"
                   value={description}
                   onChangeText={setDescription}
                   placeholderTextColor={Colors.grey40}
               />
           </View>

           <View marginV-s4>
               <Text small textMuted marginB-s1>CATEGORY (OPTIONAL)</Text>
               <TextInput
                   style={styles.input}
                   placeholder="Food, Transport, etc."
                   value={category}
                   onChangeText={setCategory}
                   placeholderTextColor={Colors.grey40}
               />
           </View>

       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    inputLarge: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.textDefault,
        paddingVertical: 10,
    },
    input: {
        fontSize: 18,
        color: Colors.textDefault,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey60,
        paddingVertical: 10,
    }
});
