<template>
    <v-form>
        <v-text-field label="Name" v-model="product.name"></v-text-field>
        <v-text-field label="Description" v-model="product.description"></v-text-field>
        <v-text-field label="Price" v-model="product.price"></v-text-field>
        <v-text-field label="Rating" v-model="product.rating"></v-text-field>
        <v-text-field label="Stock" v-model="product.stock"></v-text-field>
        <v-text-field label="Image" v-model="product.image"></v-text-field>
        <v-text-field label="Category" v-model="product.category"></v-text-field>
    </v-form>    
</template>  
  <script lang="ts" setup>
  //import { ref } from "vue";
  import { ProductDoc } from "../types/product";
  import { ref } from "vue";
  type Props = {
    product: ProductDoc;
  }
  const props = defineProps<Props>();
  const product = ref(props.product.data); 
  //const ratingStr = ref(product.rating + "/5")
  //console.log(product);
  
  
  </script>
  