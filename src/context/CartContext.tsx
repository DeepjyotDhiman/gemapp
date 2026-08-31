"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Gemstone } from "@/types/gemstone";

interface CartContextType {
  cart: CartItem[];
  addToCart: (gemstone: Gemstone, quantity?: number) => void;
  removeFromCart: (gemstoneId: string) => void;
  updateQuantity: (gemstoneId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "bhatia_gems_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync cart to localStorage whenever it updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cart, isLoaded]);

  const addToCart = (gemstone: Gemstone, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.gemstone.id === gemstone.id);
      if (existing) {
        return prev.map((item) =>
          item.gemstone.id === gemstone.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { gemstone, quantity }];
    });
  };

  const removeFromCart = (gemstoneId: string) => {
    setCart((prev) => prev.filter((item) => item.gemstone.id !== gemstoneId));
  };

  const updateQuantity = (gemstoneId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gemstoneId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.gemstone.id === gemstoneId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.gemstone.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
