import { defineStore } from "pinia";
import { vehicles } from "@/services/api";

export const useVehiclesStore = defineStore("vehicles-store", {
  state: () => ({
    vehicles: [],
    lastPage: 1,
    isLoading: false,
    totalVehiclesCount: 0,
    currentVehiclesCount: 0,
    params: {
      page: 1,
      per_page: 9,
      search: "",
    },
  }),
  actions: {
    resetParams() {
      this.params = {
        page: 1,
        per_page: 9,
        search: "",
      };
    },
    resetVariables() {
      this.vehicles = [];
      this.lastPage = 1;
      this.totalVehiclesCount = 0;
      this.currentVehiclesCount = 0;
    },
    async fetchVehicles() {
      vehicles.fetchVehicles(this.params).then(({ data }) => {
        this.isLoading = true;
        if (data?.data?.length) {
          this.vehicles = data.data;
          this.params.page = data.meta?.current_page;
          this.lastPage = data.meta?.last_page;
          this.totalVehiclesCount = data.meta?.total;
          this.currentVehiclesCount = data.meta?.to;
        } else {
          this.params.page = 1;
          this.resetVariables()
        }
        this.isLoading = false;
      });
    },
    reset() {
      this.resetParams();
      this.resetVariables();
      this.isLoading = false;
    },
  },
});
