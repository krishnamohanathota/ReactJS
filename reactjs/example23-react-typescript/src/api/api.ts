import axios from "axios";

const instance = axios.create({
  baseURL: "your_base_api_url",
});

export const api = {
  login: async (username: string, password: string) => {
    return instance.post("/login", { username, password });
  },
  logout: async () => {
    return instance.post("/logout");
  },
  getUsers: async () => {
    return instance.get("/users");
  },
  getOrders: async () => {
    return instance.get("/orders");
  },
  getPayments: async () => {
    return instance.get("/payments");
  },
};
