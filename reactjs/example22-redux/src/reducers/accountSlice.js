import { accountConstants } from "../actions/accountAction";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case accountConstants.DEPOSIT:
      return { ...state, balance: state.balance + action.payload };

    case accountConstants.WITHDRAW:
      return { ...state, balance: state.balance - action.payload };

    case accountConstants.GETLOAN:
      return {
        ...state,
        balance: state.balance + action.payload.loan,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
      };

    case accountConstants.PAYLOAN:
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}
