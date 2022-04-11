import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = { cart: { cartItems: cartItemsFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/*
Instead of setting LS in our action creators we can add a redux subscription,
so that any time the cart items change in redux ie. we add an item or remove an item,
it automatically sets LS for us.

That way we don't have to imperatively set LS in every cartItem related action creator.

The subscription runs when ever something is dispatched, so LS is whatever is state.cart.cartItems.
You're only mutating LS in one place rather than multiple action creators.
It also keeps separation of concerns with action creators only responsible for creating actions,
without side effects, so follows rules of FP.
*/

let currentState = store.getState(); // subscription

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the cartItems change - set in localStorage
  if (previousState.cart.cartItems !== currentState.cart.cartItems) {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(currentState.cart.cartItems)
    );
  }
});

export default store;
