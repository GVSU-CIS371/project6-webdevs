<template>
  <v-card
    hover
    :title="product.name"
    :text="product.description"
    :prepend-avatar="product.image"
    class="d-flex flex-column justify-space-between"
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
        <span >${{ Number(product.price).toFixed(2)}}</span>
      </span>
    </template>
    
    <v-card-actions>
      <v-btn @click.native="showEdit" variant="tonal">Edit</v-btn>
      <v-btn @click.native="emitDelete" variant="tonal">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
//import { ref } from "vue";
import { ProductDoc } from "../types/product";
import { defineEmits } from "vue";
type Props = {
  product: ProductDoc;
}
const props = defineProps<Props>();
const emit = defineEmits(['clicked', 'deleted']);
const product = props.product.data;
//const ratingStr = ref(product.rating + "/5")
//console.log(product);

function showEdit() {
  console.log("showEdit - storeItem.vue");
  emit("clicked", props.product);
}
function emitDelete() {
  console.log("deleted storeItem.vue");
  emit("deleted", props.product)
}
</script>
