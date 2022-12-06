import create from "zustand";

//use this middleware persist to wrap around the store so the state persists through refreshes
//by default it uses local storage
import { persist } from "zustand/middleware";

// Define the initial state, its initial value, and a function that updates it
// The updating function tkaes an input, then uses the 'set' method
// which takes a callback to update its state
// must prefix state.<name> to access to the current state name

const useQuantityStore = create(
  persist(
    (set, get) => ({
      cartQuantity: 0,
      setCartQuantity: (quantity) =>
        set((state) => ({ cartQuantity: state.cartQuantity + quantity })),

      removeCartQuantity: (quantity) =>
        set((state) => ({ cartQuantity: state.cartQuantity - quantity })),
    }),
    {
      name: "cart-storage",
    }
  )
);

/**
-Since I wrapped both these stores in a persist middleware, the values are stored in local storage and it will be 
persisted through refreshes
-Previously I was only using the states from the store and when I refreshed, the cart quantity and the price would dissapear 
 */
const useTotalPriceStore = create(
  persist(
    (set, get) => ({
      totalPrice: 0,
      setTotalPrice: (price) =>
        set((state) => ({
          totalPrice: parseFloat((state.totalPrice + price).toFixed(3)),
        })),
      decreaseTotalPrice: (price) =>
        set((state) => ({
          totalPrice: parseFloat((state.totalPrice - price).toFixed(3)),
        })),
    }),
    { name: "cart-price" }
  )
);

export { useQuantityStore, useTotalPriceStore };
