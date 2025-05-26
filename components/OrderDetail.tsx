import { useCustomerStore } from '@/feature/OrderSlice';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderDetail = () => {
    const customer = useCustomerStore((state) => state.customers);
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
        {customer.map((cust) => (
            <React.Fragment key={cust.id}>
            <h2>{cust.name}</h2>
            {cust.orders && cust.orders.length > 0 ? (
                cust.orders.map((order) => (
                <div key={order.id} style={{ marginBottom: 10 }}>
                    <p>Order ID: {order.id}</p>
                    <p>Order Details: {JSON.stringify(order)}</p>
                </div>
                ))
            ) : (
                <p>No orders found for this customer.</p>
            )}
            </React.Fragment>
        ))}
   </SafeAreaView>
  )
}

export default OrderDetail