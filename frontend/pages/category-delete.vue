<template>
  <v-container>
    <v-flex xs12="xs12">
      <h1 class="display-1 mb-1">Category</h1>
    </v-flex>
    <v-flex>
      <DeleteCategory />
    </v-flex>
  </v-container>
</template>

<script>
import DeleteCategory from '../components/DeleteCategory.vue'
export default {
  components: { DeleteCategory },
  layout: 'sidebar',
  head: {
    title: 'Delete Category',
  },
}
</script>

<style scoped></style>
