<template>
  <v-container>
    <v-flex xs12="xs12">
      <h1 class="display-1 mb-1">Product</h1>
    </v-flex>
    <v-flex>
      <DeleteProduct />
    </v-flex>
  </v-container>
</template>

<script>
import DeleteProduct from '../components/DeleteProduct.vue'
export default {
  components: { DeleteProduct },
  layout: 'sidebar',
  head: {
    title: 'Delete Product',
  },
}
</script>

<style scoped></style>
