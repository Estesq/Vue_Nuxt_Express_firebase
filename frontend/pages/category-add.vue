<template>
  <v-container>
    <v-flex xs12="xs12">
      <h1 class="display-1 mb-1">Add Category</h1>
    </v-flex>
    <v-flex>
      <AddCategory />
    </v-flex>
    <v-flex>
      <ListCategory />
    </v-flex>
  </v-container>
</template>

<script>
import AddCategory from '../components/AddCategory'
import ListCategory from '../components/ListCategory'
export default {
  components: { AddCategory, ListCategory },
  layout: 'sidebar',
  head: {
    title: 'Add Category',
  },
}
</script>
