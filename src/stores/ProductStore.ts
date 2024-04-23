import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import {
  DocumentReference,
  setDoc,
  doc,
  collection,
  addDoc
} from "firebase/firestore"
import { db } from "../firebase.ts"

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [] as ProductDoc[]
    };
  },
  actions: {
    init() {
      initProducts.forEach(async (prod: any) => {
        const prodDoc = doc(db, "products", prod.id)
      });
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
