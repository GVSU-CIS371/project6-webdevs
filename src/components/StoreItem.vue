<template>
  <v-card
    hover
    :title="product.name"
    :text="product.description"
    :prepend-avatar="product.image"
  >
    <template v-slot:subtitle >
      <span class="d-flex justify-space-between">
        <v-rating
          v-model="product.rating"
          active-color="yellow-accent-4"
          color="black"
          size="18"
          half-increments
          hover
          readonly
        ></v-rating>
        <!-- <v-spacer/> -->
        <span >${{ product.price.toFixed(2) }}</span>
      </span>
      
      
    </template>
  </v-card>
</template>

<script lang="ts" setup>
//import { ref } from "vue";
import { ProductDoc } from "../types/product";
type Props = {
  product: ProductDoc;
}
const props = defineProps<Props>();
const product = props.product.data;
//const ratingStr = ref(product.rating + "/5")
//console.log(product);


</script>
