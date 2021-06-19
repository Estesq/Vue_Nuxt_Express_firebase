<template>
  <v-container>
    <v-form
      v-if="updatedIndex !== -1"
      v-model="valid"
      @submit.prevent="editCategory"
    >
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="updatedItem.name"
            label="Category name"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="5">
          <v-text-field
            v-model="updatedItem.subcategory"
            label="Subcategory"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn type="submit" dense>Edit Category</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-data-table
      v-if="!getCategories.error"
      :headers="headers"
      :items="getCategories"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title>Category List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer />
          <v-btn @click="refreh">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template #[`item.edit`]="{ item }">
        <v-icon small @click="updateItem(item)"> mdi-pencil </v-icon>
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
        { text: 'Edit', value: 'edit' },
      ],
      updatedIndex: -1,
      updatedItem: {
        name: '',
        subcategory: '',
      },
    }
  },
  computed: {
    ...mapGetters('category', ['getCategories']),
  },
  created() {
    this.$store.dispatch('category/myCategories')
  },
  methods: {
    ...mapActions('category', ['myCategories', 'updateCategory']),
    updateItem(item) {
      console.log(item)
      this.updatedIndex = item.id
      this.updatedItem = Object.assign({}, item)
    },
    refresh() {
      this.myCategories()
    },
    editCategory() {
      this.updateCategory({
        index: this.updatedIndex,
        category: this.updatedItem,
      })
        .then(() => this.myCategories())
        .then(() => (this.updatedIndex = -1))
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
