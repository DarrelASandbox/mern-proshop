import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstant';

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };
