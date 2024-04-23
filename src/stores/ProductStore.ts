import { defineStore } from "pinia";
import { ProductDoc, Product } from "../types/product";
import { initProducts } from "../data-init";
import {
  DocumentReference,
  CollectionReference,
  setDoc,
  doc,
  collection,
  addDoc,
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
    init() {
      initProducts.forEach(async (prod: any) => {     //initialize firebase
        const prodDoc = doc(db, "products", prod.id);
        await setDoc(prodDoc, {
          name: prod.data.name, 
          description: prod.data.description,
          price: prod.data.price,
          rating: prod.data.rating,
          stock: prod.data.stock,
          image: prod.data.image,
          category: prod.data.category
        });
      });

      //populating pinia store from firebase
      const productCollection: CollectionReference = collection(db, "products");
      var prodDocs: ProductDoc[] = [];
      getDocs(productCollection).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
          const productData = qd.data() as Product;
          const docId = qd.id;
          prodDocs.push({id: docId, data: productData});
        });
      });
      this.products = prodDocs;
    },
    filterByCategory(category: string) {
      this.products = this.products.filter((p: ProductDoc) => p.data.category === category);
    },
    filterByRating(minRating: number) {
      this.products = this.products.filter((p: ProductDoc) => p.data.rating > minRating);
    }
  }
});
