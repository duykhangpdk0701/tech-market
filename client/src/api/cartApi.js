import axiosClient from "./axiosClient";

const cartsApi = {
  fetchCartApi: async (userId) => {
    const url = "/cart/";
    const res = axiosClient.get(url + userId);
    return res;
  },

  addWishlist: async (userId, productId, quantity) => {
    const url = "/cart/";
    const res = axiosClient.post(url, {
      user: userId,
      product: productId,
      quantity,
    });
    return res;
  },

  removeCart: async (cartId) => {
    const url = "/cart";
    const res = axiosClient.delete(url, {
      data: {
        cartId,
      },
    });
    return res;
  },
};

export default cartsApi;
