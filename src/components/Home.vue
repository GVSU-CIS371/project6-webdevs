<template>
  <v-container>
    <v-row align="stretch">
      <v-col
        v-for="(product, index) in productStore.products"
        :key="index"
        cols="12"
        md="4"
      >
        <StoreItem :product="product" class="fill-height"></StoreItem>
      </v-col>
    </v-row>
  </v-container>
  <EditItem :product="testProduct"></EditItem>
</template>

<script lang="ts" setup>
  import { useProductStore } from '../stores/ProductStore';
  //import { onMounted } from 'vue';
  import StoreItem from "./StoreItem.vue";
  import EditItem from "./EditItem.vue";
  
  const productStore = useProductStore();
  productStore.init();
  const testProduct = {
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
    },
  }
    
  
  
  //productStore.init();
  //console.log(productStore.products);

  
</script>
