import create from "zustand";

// use this middleware persist to wrap around the store so the state persists through refreshes
// by default it uses local storage
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

      resetCartQuantity: () => set({ cartQuantity: 0 }),
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
      resetTotalPrice: () => set({ totalPrice: 0 }),
    }),
    { name: "cart-price" }
  )
);

// const useUserStore = create(
//   persist(
//     (set, get) => ({
//       user: {},
//       // the two codes are the same. If we care about using the current state value (like adding/subracting)
//       // that I did above, then use the state function like above. Otherwise like here, if we
//       // simply are setting values based on the parameter, we can just omit passing in the state function
//       // setUser: (obj) => set(() => ({ user: obj })), // this code and the code below are the same
//       setUser: (obj) => set((state) => ({ user: obj })),
//     }),
//     { name: "user" }
//   )
// );

const useUserStore = create(
  persist(
    (set, get) => ({
      user: "",
      userToken: "",
      setUser: (name) => set({ user: name }),
      setToken: (token) => set({ userToken: token }),
      
      resetUser: () => set({ user: ""}),
      resetToken: () => set({ userToken: "" }),

      // the two codes are the same. If we care about using the current state value (like adding/subracting)
      // that I did above, then use the state function like above. Otherwise like here, if we
      // simply are setting values based on the parameter, we can just omit passing in the state function
      // setUser: (obj) => set(() => ({ user: obj })), 
      // setUser: (obj) => set((state) => ({ user: obj })),
    }),
    { name: "user" }
  )
);

export { useQuantityStore, useTotalPriceStore, useUserStore };
