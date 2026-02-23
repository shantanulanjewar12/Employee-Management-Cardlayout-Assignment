import { create } from "zustand";
import api from "../services/api";

const useEmployeeStore = create((set) => ({
  employees: [],
  selectedEmployee: null,


  resetEmployees: () =>
    set({
      employees: [],
      selectedEmployee: null
    }),


    fetchEmployees: async () => {
    try {
      const res = await api.get("/employees");
      set({ employees: res.data });
      return res.data;
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      throw error;
    }
  },




  selectEmployee: (emp) => set({ selectedEmployee: emp }),




  deleteEmployee: async (id) => {
    try {
      const res = await api.delete(`/employees/${id}`);

      set((state) => ({
        employees: state.employees.filter((e) => e.id !== id),
        selectedEmployee: null
      }));

      return res.data;
    } catch (error) {
      console.error("Delete failed:", error);
      throw error;
    }
  },




  updateEmployee: async (id, data) => {
    try {
      const res = await api.put(`/employees/${id}`, data);

      set((state) => {
        const updatedEmployees = state.employees.map((e) =>
          e.id === id ? { ...e, ...data } : e
        );

        const updatedSelected =
          state.selectedEmployee?.id === id
            ? { ...state.selectedEmployee, ...data }
            : state.selectedEmployee;

        return {
          employees: updatedEmployees,
          selectedEmployee: updatedSelected
        };
      });

      return res.data;

    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }
}));

export default useEmployeeStore;