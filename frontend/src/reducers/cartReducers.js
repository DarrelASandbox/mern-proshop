import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

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

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export { cartReducer };
