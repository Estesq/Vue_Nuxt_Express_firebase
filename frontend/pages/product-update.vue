<template>
  <v-container>
    <v-flex xs12="xs12">
      <h1 class="display-1 mb-1">Product</h1>
    </v-flex>
    <v-flex>
      <UpdateProduct />
    </v-flex>
  </v-container>
</template>

<script>
import UpdateProduct from '../components/UpdateProduct.vue'
export default {
  components: { UpdateProduct },
  layout: 'sidebar',
  head: {
    title: 'Update Product',
  },
}
</script>

<style scoped></style>
