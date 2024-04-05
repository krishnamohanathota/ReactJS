export const accountConstants = {
  DEPOSIT: "account/deposit",
  WITHDRAW: "account/withdraw",
  GETLOAN: "account/requestLoan",
  PAYLOAN: "account/payLoan",
};

export function deposit(amount, currency) {
  return { type: accountConstants.DEPOSIT, payload: amount };
}

export function withdraw(amount) {
  return { type: accountConstants.WITHDRAW, payload: amount };
}

export function getLoan(amount, purpose) {
  return {
    type: accountConstants.GETLOAN,
    payload: { loan: amount, loanPurpose: purpose },
  };
}

export function payLoan() {
  return { type: accountConstants.PAYLOAN };
}
