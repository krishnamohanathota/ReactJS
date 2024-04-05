import { customerConstants } from "../actions/customerAction";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case customerConstants.CREATE:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
      };
    case customerConstants.UPDATE:
      return { ...state, fullName: action.payload.fullName };
    default:
      return state;
  }
}
