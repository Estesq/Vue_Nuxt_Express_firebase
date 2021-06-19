<template>
  <v-container>
    <v-flex xs12="xs12">
      <h1 class="display-1 mb-1">Category</h1>
    </v-flex>
    <v-flex>
      <UpdateCategory />
    </v-flex>
  </v-container>
</template>

<script>
import UpdateCategory from '../components/UpdateCategory.vue'
export default {
  components: { UpdateCategory },
  layout: 'sidebar',
  head: {
    title: 'Update Category',
  },
}
</script>

<style scoped></style>
