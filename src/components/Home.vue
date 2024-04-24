<template>
  <v-container>
    <v-row align="stretch">
      <v-col
        v-for="(product, index) in productStore.products"
        :key="index"
        cols="12"
        md="4"
      >
        <StoreItem :product="product" class="fill-height" @clicked="onClickEdit"></StoreItem>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay v-model="showEdit">
    <EditItem :product="editedProduct"></EditItem>
  </v-overlay>
  
</template>

<script lang="ts" setup>
  import { useProductStore } from '../stores/ProductStore';
  import { ref } from 'vue';
  import StoreItem from "./StoreItem.vue";
  import EditItem from "./EditItem.vue";
  import { ProductDoc } from '../types/product';
  
  const productStore = useProductStore();
  productStore.init();
  const showEdit = ref(false);
  function onClickEdit(value: ProductDoc) {
    editedProduct.value = value;
    showEdit.value = true;
  }
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
    },
  });
    
  
  
  //productStore.init();
  //console.log(productStore.products);

  
</script>
