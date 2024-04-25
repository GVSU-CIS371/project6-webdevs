import { defineStore } from "pinia";
import { ProductDoc, Product } from "../types/product";
import { initProducts } from "../data-init";
import {
  CollectionReference,
  setDoc,
  doc,
  collection,
  QuerySnapshot,
  QueryDocumentSnapshot,
  getDocs
} from "firebase/firestore"
import { db } from "../firebase.ts"

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [] as ProductDoc[]
    };
  },
  actions: {
    async init() {
      // Check if the Firestore database is already populated
      const prodCollection: CollectionReference = collection(db, "products");
      const allDocSnapshot: QuerySnapshot = await getDocs(prodCollection);

      // If database is empty, populate it
      if (allDocSnapshot.size === 0) {
        const initPromises = initProducts.map(async (prod: any) => {     //initialize firebase
          const prodDoc = doc(db, "products", prod.id);
          await setDoc(prodDoc, {
            name: prod.data.name, 
            description: prod.data.description,
            price: prod.data.price,
            rating: prod.data.rating,
            stock: prod.data.stock,
            image: prod.data.image,
            category: prod.data.category
          },
          {merge: true}
          );
        });

        await Promise.all(initPromises);
      }

      //populating pinia store from firebase
      const productCollection: CollectionReference = collection(db, "products");
      var prodDocs: ProductDoc[] = [];
      const qs: QuerySnapshot = await getDocs(productCollection);
      qs.forEach((qd: QueryDocumentSnapshot) => {
        //console.log(qd.id, qd.data());
        const productData = qd.data() as Product;
        const docId = qd.id;
        prodDocs.push({id: docId, data: productData});
      });
      this.products = prodDocs;
      console.log("ProductStore initialized");
    },
    async filterByCategory(category: string) {
      await this.init();
      this.products = this.products.filter((p: ProductDoc) => p.data.category === category);
    },
    async filterByRating(minRating: number) {
      await this.init();
      this.products = this.products.filter((p: ProductDoc) => p.data.rating > minRating);
    }
  }
});
