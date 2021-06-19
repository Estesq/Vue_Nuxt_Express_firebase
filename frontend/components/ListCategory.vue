<template>
  <v-container>
    <v-data-table
      v-if="!getCategories.error"
      :headers="headers"
      :items="getCategories"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title> Category List </v-toolbar-title>
          <v-spacer />
          <v-btn @click="refresh">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-data-table
      v-else
      :headers="headers"
      :items-per-page="5"
      class="elevation-1"
    >
      <template slot="no-data">
        {{ getCategories.error }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  methods: {
    ...mapActions('category', ['myCategories']),
    refresh() {
      this.myCategories()
    },
  },
}
</script>

<style scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 3%),
    0px 1px 10px 0px rgb(0 0 0 / 3%);
}
</style>
