import productAction from "../actions/productAction";

export interface IProductState {
  productName?: string;
  productId?: string;
}

const initialState: IProductState = {
  productName: undefined,
  productId: undefined,
};

export default function customerReducer(
  state: IProductState = initialState,
  action: any
) {
  switch (action.type) {
    case productAction.Constants.productName:
      return {
        ...state,
        productName: action.payload.productName,
      };
    case productAction.Constants.productId:
      return { ...state, productId: action.payload.productId };
    default:
      return state;
  }
}
