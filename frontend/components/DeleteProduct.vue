<template>
  <v-container>
    <v-data-table
      v-if="!getProducts.error"
      :headers="headers"
      :items="getProducts"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title> Product List</v-toolbar-title>
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
    <v-layout v-else>
      <v-flex> <h6>Products are not added yet.</h6></v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
        { text: 'Delete', value: 'delete' },
      ],
      dialogDelete: false,
      editedIndex: -1,
    }
  },
  computed: {
    ...mapGetters('product', ['getProducts']),
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.$store.dispatch('product/myProducts')
  },
  methods: {
    ...mapActions('product', ['myProducts', 'removeProduct']),
    refresh() {
      this.myProducts()
    },
    deleteItem(item) {
      console.log(item)
      this.deleteId = item.id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.removeProduct({ deleteId: this.deleteId })
        .then(() => this.myProducts())
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
