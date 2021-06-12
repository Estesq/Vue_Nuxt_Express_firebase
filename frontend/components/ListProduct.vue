<template>
  <v-data-table
    v-if="getProducts"
    :headers="headers"
    :items="getProducts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Product',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Category', value: 'category' },
        { text: 'Subcategory', value: 'subcategory' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
      ],
    }
  },
  computed: {
    ...mapGetters('product', ['getProducts']),
  },
  created() {
    this.$store.dispatch('product/myProducts')
  },
}
</script>

<style lang="scss" scoped></style>
