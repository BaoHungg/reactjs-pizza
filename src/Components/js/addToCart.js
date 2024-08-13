import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity; // Trừ tổng tiền cũ
        existingItem.quantity += action.payload.quantity; // Cập nhật số lượng mới
        state.totalAmount += existingItem.price * existingItem.quantity; // Cập nhật tổng tiền mới
      } else {
        state.items.push(action.payload);
        state.totalAmount += action.payload.price * action.payload.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity; // Trừ tổng tiền sản phẩm bị xóa
        state.items = state.items.filter(item => item.id !== itemId);
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        state.totalAmount += existingItem.price; // Thêm tổng tiền mới
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) { // Đảm bảo số lượng không nhỏ hơn 1
          state.totalAmount -= existingItem.price; // Trừ tổng tiền cũ
          existingItem.quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const selectCartItemsCount = (state) => state.cart.items.length;
export default cartSlice.reducer;
