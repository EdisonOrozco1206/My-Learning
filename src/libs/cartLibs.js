import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (course) => set((state) => {
        // Si el curso ya está en el carrito, no lo agregamos nuevamente
        const exists = state.cart.some((item) => item.id === course.id);
        if (exists) return state; // No hacer nada

        return { cart: [...state.cart, { ...course, quantity: 1 }] };
      }),

      removeFromCart: (courseId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== courseId),
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", 
      getStorage: () => localStorage, 
    }
  )
);