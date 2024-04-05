export const customerConstants = {
  CREATE: "customer/create",
  UPDATE: "customer/update",
};

export function createCustomer(fullName, nationalID) {
  return {
    type: customerConstants.CREATE,
    payload: { fullName: fullName, nationalID: nationalID },
  };
}

export function updateCustomer(fullName) {
  return {
    type: customerConstants.UPDATE,
    payload: { fullName: fullName },
  };
}
