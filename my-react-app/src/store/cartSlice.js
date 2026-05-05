import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0, // total quantity of all items in cart
  },
  reducers: {
    // Set count from fetched cart data (sum of all quantities)
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    // Increment when a product is added to cart
    incrementCart: (state) => {
      state.count += 1;
    },
    // Decrement when a product is removed
    decrementCart: (state, action) => {
      // action.payload = quantity of removed item (default 1)
      state.count = Math.max(0, state.count - (action.payload || 1));
    },
    // Reset when order is placed
    resetCart: (state) => {
      state.count = 0;
    },
  },
});

export const { setCartCount, incrementCart, decrementCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
