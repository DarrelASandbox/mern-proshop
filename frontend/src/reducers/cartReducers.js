import { CART_ADD_ITEM } from '../constants/cartConstants';

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === cartItem.id);

      if (existItem)
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === existItem.id ? cartItem : item
          ),
        };
      return { ...state, cartItems: [...state.cartItems, cartItem] };

    default:
      return state;
  }
};

export { cartReducer };
