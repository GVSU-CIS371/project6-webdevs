<template>
    <v-container>
        <v-form @submit.prevent="handleSubmit">
            <v-text-field label="Name" v-model="product.name" :rules="globalRules"></v-text-field>
            <v-text-field label="Description" v-model="product.description" :rules="globalRules"></v-text-field>
            <v-text-field label="Price" v-model="product.price" :rules="priceRules"></v-text-field>
            <v-text-field label="Rating" v-model="product.rating" :rules="ratingRules"></v-text-field>
            <v-text-field label="Stock" v-model="product.stock" :rules="stockRules"></v-text-field>
            <v-text-field label="Image" v-model="product.image" :rules="globalRules"></v-text-field>
            <v-text-field label="Category" v-model="product.category" :rules="globalRules"></v-text-field>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>  
    </v-container>  
</template>  
  <script lang="ts" setup>
  //import { ref } from "vue";
  import { ProductDoc } from "../types/product";
  import { ref } from "vue";
  import {
    DocumentReference,
    CollectionReference,
    setDoc,
    doc,
    collection,
    addDoc,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentSnapshot,
    getDoc,
    getDocs
  } from "firebase/firestore"
  import { db } from "../firebase.ts"

  type Props = {
    product: ProductDoc;
  }
  const props = defineProps<Props>();
  const product = ref(props.product.data); 

  const handleSubmit = async () => {
    const prodDoc = doc(db, "products", props.product.id);
          await setDoc(prodDoc, {
            name: product.value.name, 
            description: product.value.description,
            price: product.value.price,
            rating: product.value.rating,
            stock: product.value.stock,
            image: product.value.image,
            category: product.value.category
          },
          {merge: true}
          );
  }

  //rules for form
  const globalRules = [
    (value: string) => {
        if (value) return true;
        return "This field is required";
    }
  ]
  const priceRules = [
    (value: string) => {
        if (!isNaN(Number(value))) return true;
        return "Price must be a number";
    },
    (value: string) => {
        if (value) return true;
        return "This field is required";
    }
  ];
  const ratingRules = [
    (value: string) => {
        if (!isNaN(Number(value))) return true;
        return "Rating must be a number between 0 and 5";
    },
    (value: string) => {
        if(Number(value) <= 5 && Number(value) >= 0) return true;
        return "Rating must be a number between 0 and 5";
    },
    (value: string) => {
        if (value) return true;
        return "This field is required";
    }
  ];
  const stockRules = [
    (value: string) => {
        if (!isNaN(Number(value))) return true;
        return "Stock must be a number.";
    },
    (value: string) => {
        if(Number(value) >= 0) return true;
        return "Stock cannot be negative";
    },
    (value: string) => {
        if (value) return true;
        return "This field is required";
    }
  ];
  
  //const ratingStr = ref(product.rating + "/5")
  //console.log(product);
  
  
  </script>
  