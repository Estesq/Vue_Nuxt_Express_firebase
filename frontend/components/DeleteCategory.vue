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
          <v-toolbar-title> Category List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer />
          <v-btn @click="refresh">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template #[`item.delete`]="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
        { text: 'Delete', value: 'delete' },
      ],
      deleteId: null,
      dialogDelete: false,
    }
  },
  computed: {
    ...mapGetters('category', ['getCategories']),
  },
  created() {
    this.$store.dispatch('category/myCategories')
  },
  methods: {
    ...mapActions('category', ['removeCategory', 'myCategories']),
    refresh() {
      this.myCategories()
    },
    deleteItem(item) {
      console.log(item)
      this.deleteId = item.id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.removeCategory({
        deleteId: this.deleteId,
      })
        .then(() => this.myCategories())
        .then(() => this.closeDelete())
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
