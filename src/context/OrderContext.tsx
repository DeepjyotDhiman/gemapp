"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { OrderCustomerInfo, OrderRequest, CartItem } from "@/types/gemstone";

interface OrderContextType {
  createOrderRequest: (customer: OrderCustomerInfo, items: CartItem[], subtotal: number) => Promise<OrderRequest>;
  getOrderById: (id: string) => OrderRequest | undefined;
  recentOrder: OrderRequest | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = "bhati_gems_orders_v1";

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<OrderRequest[]>([]);
  const [recentOrder, setRecentOrder] = useState<OrderRequest | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse orders from localStorage", e);
    }
  }, []);

  const createOrderRequest = async (
    customer: OrderCustomerInfo,
    items: CartItem[],
    subtotal: number
  ): Promise<OrderRequest> => {
    // Generate a unique order reference (e.g., BG-2026-7842)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BG-2026-${randomSuffix}`;

    const newOrder: OrderRequest = {
      id: orderId,
      customer,
      items: [...items],
      subtotal,
      totalAmount: subtotal, // In Phase 1 no added shipping/taxes
      createdAt: new Date().toISOString(),
      status: "pending_confirmation",
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    setRecentOrder(newOrder);

    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save order to localStorage", e);
    }

    // In Phase 2: Insert into Supabase table 'orders'
    return newOrder;
  };

  const getOrderById = (id: string): OrderRequest | undefined => {
    return orders.find((o) => o.id.toLowerCase() === id.toLowerCase()) || 
      (recentOrder && recentOrder.id.toLowerCase() === id.toLowerCase() ? recentOrder : undefined);
  };

  return (
    <OrderContext.Provider value={{ createOrderRequest, getOrderById, recentOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
