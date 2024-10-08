import { Text, FlatList, ActivityIndicator } from "react-native";
import OrderItemListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

    const queryClient = useQueryClient();
 
    useEffect(() => {
        const ordersSubscription = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log('Change received!', payload);
                    queryClient.invalidateQueries(({queryKey: ['orders']}));
                }
            )
            .subscribe();
        return () => {
            ordersSubscription.unsubscribe();
        };
    }, []);
    
    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch</Text>
    }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItemListItem order={item} />}
            contentContainerStyle={{gap:10, padding:10}}
        />
    );
}