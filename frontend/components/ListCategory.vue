<template>
  <v-data-table
    v-if="getCategories"
    :headers="headers"
    :items="getCategories"
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
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Subcategory', value: 'subcategory' },
      ],
    }
  },
  computed: {
    ...mapGetters('category', ['getCategories']),
  },
  created() {
    this.$store.dispatch('category/myCategories')
  },
}
</script>

<style lang="scss" scoped></style>
