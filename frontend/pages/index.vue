<template>
  <v-container class="pa-4" fluid="fluid" grid-list-md="grid-list-md">
    <v-layout wrap="wrap">
      <v-flex xs12="xs12">
        <h1 class="display-1 mb-1">Dashboard</h1>
      </v-flex>
      <v-flex xs12="xs12" md6="md6">
        <v-layout wrap="wrap">
          <v-flex xs6="xs6">
            <v-card class="text-md-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">{{ getCategoryCounts }}</div>
                Categories
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6="xs6">
            <v-card class="text-md-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">{{ getProductCounts }}</div>
                Products
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'sidebar',
  head: {
    title: 'Dashboard',
  },
  computed: {
    ...mapGetters('category', ['getCategoryCounts']),
    ...mapGetters('product', ['getProductCounts']),
  },
  created() {
    this.$store.dispatch('category/myCategories')
    this.$store.dispatch('product/myProducts')
  },
}
</script>

<style scoped></style>
