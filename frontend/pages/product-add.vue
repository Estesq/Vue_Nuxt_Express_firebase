<template>
  <v-container>
    <v-flex xs12="xs12">
      <h1 class="display-1 mb-1">Add Product</h1>
    </v-flex>
    <v-flex>
      <AddProduct />
    </v-flex>
    <v-flex> <ListProduct /> </v-flex>
  </v-container>
</template>

<script>
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
export default {
  components: { AddProduct, ListProduct },
  layout: 'sidebar',
  head: {
    title: 'Add Product',
  },
}
</script>
