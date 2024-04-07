const Constants = {
  productName: "productName",
  productId: "productId",
};

const setProductName = (data: any) => ({
  type: Constants.productName,
  payload: data,
});

const setProductId = (data: any) => ({
  type: Constants.productId,
  payload: data,
});

export default {
  Constants,
  setProductName,
  setProductId,
};
