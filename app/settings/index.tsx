
import React from 'react';
import { View, Text, Button, Colors, TouchableOpacity, Switch } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';

import { useUserStore } from '../../store/user-store';
import { useTransactionStore } from '../../store/transaction-store';

export default function SettingsScreen() {
    const router = useRouter();
    const { income, payday, fixedExpenses, resetUser } = useUserStore();
    const { resetTransactions } = useTransactionStore();

    const handleReset = () => {
        Alert.alert(
            "Reset App",
            "Are you sure you want to wipe all data? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Reset", 
                    style: "destructive", 
                    onPress: () => {
                        resetUser();
                        resetTransactions();
                        router.replace('/onboarding');
                    }
                }
            ]
        );
    };

    const totalFixed = fixedExpenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.screenBG }}>
            <StatusBar style="dark" />
            <View flex padding-page>
                
                {/* Header */}
                <View row spread centerV marginB-s8>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color={Colors.textDefault} />
                    </TouchableOpacity>
                    <Text h3>Settings</Text>
                    <View width={24} /> 
                </View>

                {/* Profile Section */}
                <View marginB-s8>
                    <Text h2 marginB-s4>Profile</Text>
                    
                    <View row spread marginB-s4>
                        <Text body textMuted>Monthly Income</Text>
                        <Text body textDefault>₦{(income || 0).toLocaleString()}</Text>
                    </View>

                    <View row spread marginB-s4>
                        <Text body textMuted>Payday</Text>
                        <Text body textDefault>Day {payday || '?'}</Text>
                    </View>

                    <View row spread marginB-s4>
                        <Text body textMuted>Fixed Expenses</Text>
                        <Text body textDefault>₦{totalFixed.toLocaleString()}</Text>
                    </View>
                </View>

                {/* Preferences (Mock) */}
                <View marginB-s8>
                    <Text h2 marginB-s4>Preferences</Text>
                    <View row spread centerV marginB-s4>
                        <Text body>Quiet Mode (Default)</Text>
                         <Switch value={false} onColor={Colors.primary} />
                    </View>
                </View>

                <View flex />

                {/* Danger Zone */}
                <View marginB-s4>
                    <Button 
                        label="Reset App Data" 
                        outline 
                        outlineColor={Colors.error} 
                        color={Colors.error}
                        onPress={handleReset} 
                    />
                    <Text center small textMuted marginT-s2>Version 1.0.0 (Alpha)</Text>
                </View>

            </View>
        </SafeAreaView>
    );
}
