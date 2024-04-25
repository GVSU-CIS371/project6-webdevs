<template>
  <v-container>
    <v-row align="stretch">
      <v-col
        v-for="(product, index) in productStore.products"
        :key="product.id"
        cols="12"
        md="4"
      >
        <StoreItem :product="product" class="fill-height" @clicked="onClickEdit" @deleted="onClickDelete"></StoreItem>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showEdit" width="auto">
    <v-card
        min-width="800"
        title="Edit item"
      >
      <EditItem :product="editedProduct" @clicked="onClickSubmit"></EditItem>
      </v-card>
    
  </v-dialog>
</template>

<script lang="ts" setup>
  import { useProductStore } from '../stores/ProductStore';
  import { ref } from 'vue';
  import StoreItem from "./StoreItem.vue";
  import EditItem from "./EditItem.vue";
  import { ProductDoc } from '../types/product';
  import {doc, deleteDoc} from "firebase/firestore"
  import {db, } from "../firebase"
  
  const productStore = useProductStore();
  productStore.filterByRating(4.5);
  const showEdit = ref(false);
  const editedProduct = ref({
    id: "0",
    data: {
      name: "Gamer's Delight Laptop",
      description:
        "A powerful gaming laptop with top-tier graphics and performance for immersive gaming experiences.",
      price: 1200,
      rating: 4,
      stock: 5,
      //a fake image
      image:
        "https://m.media-amazon.com/images/I/31TcnQiBTpL._AC_UF894,1000_QL80_.jpg",
      category: "Electronics",
    }
  });
  function onClickEdit(value: ProductDoc) {
    //console.log(value);
    editedProduct.value = value;
    showEdit.value = true;
  }
  function onClickSubmit() {
    showEdit.value = false;
    productStore.filterByRating(4.5);
  }
  async function onClickDelete(value: ProductDoc) {
    console.log("deleted: Home.vue");
    await deleteDoc(doc(db, "products", value.id));
    productStore.filterByRating(4.5);
  }
    //console.log(productStore.products);
  
  
  
  //productStore.init();
  //console.log(productStore.products);

  
</script>
