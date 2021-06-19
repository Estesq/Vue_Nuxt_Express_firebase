<template>
  <v-container>
    <v-form
      v-if="updatedIndex !== -1"
      v-model="valid"
      @submit.prevent="editProduct"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="9">
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="updatedItem.name"
                  :rules="nameRules"
                  label="Product name"
                  dense
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-file-input
                  ref="image"
                  v-model="updatedItem.image"
                  label="Image files"
                  accept="image/*"
                  outlined
                  dense
                >
                </v-file-input>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="updatedItem.price"
                  precision="2"
                  type="number"
                  label="Price"
                  dense
                  outlined
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="updatedItem.quantity"
                  precision="0"
                  type="number"
                  label="Quantity"
                  dense
                  outlined
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="updatedItem.subcategory"
                  :items="getDistinctSubcategories"
                  :rules="[(v) => !!v || 'Subcategory is required']"
                  label="Subcategory"
                  dense
                  outlined
                  required
                  @change="onChange"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="updatedItem.category"
                  :items="categoryList"
                  :rules="[(v) => !!v || 'Category is required']"
                  label="Category"
                  :disabled="subcategory === ''"
                  dense
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-textarea
              v-model="updatedItem.description"
              solo
              rows="4"
              label="Description"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn type="submit">Submit</v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-data-table
      v-if="!getProducts.error"
      :headers="headers"
      :items="getProducts"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title>Update Product</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer />
          <v-btn @click="refresh">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-dialog
            v-model="dialog"
            class="py-1"
            width="640px"
            max-width="100%"
          >
            <v-card>
              <v-row>
                <v-col col="12" md6="md6" align="center">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    class="white--text align-end my-2"
                    aspect-ratio="1"
                    max-width="70%"
                    min-height="70%"
                    contain
                    :src="dialogImage"
                  >
                  </v-img>
                </v-col>
                <v-col col="12" md6="md6">
                  <h3>{{ dialogItem.name }}</h3>
                  <v-card-actions>
                    <v-btn color="red" @click="deleteImage"> Delete </v-btn>
                    <v-btn color="red" @click="dialogClose"> Close </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogForm" width="500" max-width="100%">
            <v-card class="text-center">
              <v-card-title>
                {{ dialogItem.name }}
              </v-card-title>
              <v-form ref="addform" @submit.prevent="addImage">
                <v-file-input
                  ref="image"
                  v-model="image"
                  class="py-2 px-2"
                  label="Image files"
                  accept="image/*"
                  outlined
                  dense
                >
                </v-file-input>
                <v-btn type="submit" class="my-2 mx-2">Add</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.edit`]="{ item }">
        <v-icon small @click="updateItem(item)"> mdi-pencil </v-icon>
      </template>
      <template #[`item.images`]="{ item }">
        <v-btn
          v-for="i in item.image"
          v-bind:key="i"
          @click="dialogOpen(i, item)"
        >
          {{ '#' + (item.image.indexOf(i) + 1) }}
        </v-btn>
        <v-btn @click="dialogFormOpen(item)"><v-icon>mdi-plus</v-icon></v-btn>
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
        { text: 'Edit', value: 'edit' },
        { text: 'Images', value: 'images' },
      ],
      dialogDelete: false,
      updatedIndex: -1,
      updatedItem: {
        name: '',
        category: '',
        subcategory: '',
        price: 0,
        quantity: 0,
        description: '',
      },
      dialog: false,
      dialogImage: '',
      image: null,
      dialogForm: false,
      dialogItem: {
        name: '',
        images: null,
        id: '',
      },
      categoryList: [],
    }
  },
  computed: {
    ...mapGetters('product', ['getProducts']),
    ...mapGetters('category', ['getDistinctSubcategories']),
  },
  created() {
    this.$store.dispatch('product/myProducts')
    this.$store.dispatch('category/myCategories')
  },
  methods: {
    ...mapActions('product', [
      'myProducts',
      'updateProduct',
      'removeImage',
      'newImage',
    ]),
    refresh() {
      this.myProducts()
    },
    onChange(e) {
      this.categoryList = this.$store.getters['category/getCategories']
        .filter((el) => el.subcategory === e)
        .map((el) => el.name)
    },
    updateItem(item) {
      console.log(item)
      this.updatedIndex = item.id
      this.categoryList = this.$store.getters['category/getCategories'].map(
        (el) => el.name
      )
      this.updatedItem = Object.assign({}, item)
    },
    editProduct() {
      this.updateProduct({
        index: this.updatedIndex,
        product: this.updatedItem,
      })
        .then(() => this.myProducts())
        .then(() => (this.updatedIndex = -1))
    },
    dialogOpen(i, item) {
      this.dialog = true
      this.dialogImage = i
      this.dialogItem = item
    },
    dialogFormOpen(item) {
      this.dialogForm = true
      this.dialogItem = item
    },
    dialogClose() {
      this.dialog = false
    },
    deleteImage() {
      this.removeImage({
        id: this.dialogItem.id,
        i: this.dialogImage,
        images: this.dialogItem.image,
      })
        .then(() => this.myProducts())
        .then(() => this.dialogClose())
    },
    addImage() {
      this.newImage({
        id: this.dialogItem.id,
        image: this.image,
      })
        .then(() => this.myProducts())
        .then(() => this.$refs.addform.reset())
      this.dialogForm = false
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
