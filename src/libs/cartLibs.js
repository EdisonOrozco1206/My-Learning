import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (course) => set((state) => {
        const existingCourse = state.cart.find((item) => item.id === course.id);
        if (existingCourse) {
          return {
            cart: state.cart.map((item) =>
              item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
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
