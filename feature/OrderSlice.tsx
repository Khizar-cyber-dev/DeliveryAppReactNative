import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface Order {
    id: string;
    [key: string]: any;
}

interface Customer {
    id: string;
    name: string;
    orders: Order[];
    address: string;
    mobileNumber: string;
    openingBalance: string;
    zone: string;
    location: { latitude: number; longitude: number } | null;
    createdAt: string;
    [key: string]: any;
}

interface CustomerSlice {
    customers: Customer[];
    addCustomer: (customer: Omit<Customer, 'orders'>) => void;
    removerCustomer: (customerId: string) => void;
    updateCustomer: (customerId: string, updatedCustomer: Partial<Customer>) => void;
    addOrder: (customerId: string, order: Order) => void;
}

const customerSlice = (set: (fn: (state: CustomerSlice) => Partial<CustomerSlice>) => void): CustomerSlice => ({
    customers: [],
    addCustomer: (customer: Omit<Customer, 'orders'>) => set((state) => ({
        customers: [...state.customers, { ...customer, orders: [] } as unknown as Customer]
    })),
    removerCustomer: (customerId) => set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== customerId)
    })),
    updateCustomer: (customerId, updatedCustomer) => set((state) => ({
        customers: state.customers.map((customer) =>
            customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
        )
    })),
    addOrder: (customerId, order) => set((state) => ({
        customers: state.customers.map((customer) =>
            customer.id === customerId
                ? { ...customer, orders: [...(customer.orders || []), order] }
                : customer
        )
    })),
});

export default customerSlice;


export const useCustomerStore = create<CustomerSlice>()(
    devtools(
        persist(
            customerSlice,
            {
                name: 'customer-storage',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
);