import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [] as ProductDoc[]
    };
  },
  actions: {
    init() {
      this.products = initProducts;
    },
    filterByCategory(category: string) {
      this.products = this.products.filter((p: ProductDoc) => p.data.category === category);
    },
    filterByRating(minRating: number) {
      this.products = this.products.filter((p: ProductDoc) => p.data.rating > minRating);
    }
  }
});
