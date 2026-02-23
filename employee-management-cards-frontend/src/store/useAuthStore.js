import { create } from "zustand";
import api from "../services/api";
import useEmployeeStore from "./useEmployeeStore";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const { user, token } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    set({ user, token });
  },



  logout: () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");


    useEmployeeStore.getState().resetEmployees();


    set({ user: null, token: null });
  }
}));



export default useAuthStore;