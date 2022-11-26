import create from "zustand"

// Define the initial state, its initial value, and a function that updates it
// The updating function tkaes an input, then uses the 'set' method
// which takes a callback to update its state
// must prefix state.<name> to access to the current state name

const useQuantityStore = create((set) => ({
  cartQuantity: 0,
  setCartQuantity: (quantity) =>
    set((state) => ({ cartQuantity: state.cartQuantity + quantity }))
}))

const useTotalPriceStore = create((set) => ({
  totalPrice: 0,
  setTotalPrice: (price) =>
    set((state) => ({ totalPrice: state.totalPrice + price }))
}))

export { useQuantityStore, useTotalPriceStore }
