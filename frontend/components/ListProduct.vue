<template>
  <v-container>
    <v-data-table
      v-if="!getProducts.error || getProducts"
      :headers="headers"
      :items="getProducts"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title> Product List </v-toolbar-title>
          <v-spacer />
          <v-btn @click="refreh">
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
      <template #[`item.images`]="{ item }" width="150">
        <v-flex>
          <v-btn
            v-for="i in item.image"
            v-bind:key="i"
            @click="dialogOpen(i, item)"
          >
            {{ '#' + (item.image.indexOf(i) + 1) }}
          </v-btn>
          <v-btn @click="dialogFormOpen(item)"><v-icon>mdi-plus</v-icon></v-btn>
        </v-flex>
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
          text: 'Product',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Category', value: 'category' },
        { text: 'Subcategory', value: 'subcategory' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Images', value: 'images' },
      ],
      dialog: false,
      dialogImage: '',
      dialogItem: {
        name: '',
        images: null,
        id: '',
      },
      dialogForm: false,
      image: null,
    }
  },
  computed: {
    ...mapGetters('product', ['getProducts']),
  },
  created() {
    this.myProducts()
  },
  methods: {
    ...mapActions('product', ['myProducts', 'removeImage', 'newImage']),
    refreh() {
      this.myProducts()
    },
    dialogOpen(i, item) {
      this.dialog = true
      this.dialogImage = i
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
    dialogFormOpen(item) {
      this.dialogForm = true
      this.dialogItem = item
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
.v-card {
  overflow: hidden;
}
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 3%),
    0px 1px 10px 0px rgb(0 0 0 / 3%);
}
</style>
