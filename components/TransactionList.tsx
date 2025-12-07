
import React from 'react';
import { FlatList } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import { useTransactionStore } from '../store/transaction-store';

/**
 * TransactionList
 * Renders a list of recent transactions from the store.
 */
export default function TransactionList() {
    const { transactions } = useTransactionStore();

    if (transactions.length === 0) {
        return (
            <View center marginT-s8>
                <Text textMuted small>No transactions yet.</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: any }) => {
        const date = new Date(item.date).toLocaleDateString();
        return (
            <View row spread centerV paddingV-s3 paddingH-s4 bg-white marginB-s2 br20>
                <View>
                    <Text body textDefault>{item.description}</Text>
                    <Text small textMuted>{date} • {item.category}</Text>
                </View>
                <Text body error>-₦{item.amount.toLocaleString()}</Text>
            </View>
        );
    };

    return (
        <View flex>
             <Text h2 marginB-s4 style={{ opacity: 0.8 }}>Recent</Text>
             <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEnabled={false} // Since it's nested in a ScrollView usually, or simple view
             />
        </View>
    );
}
