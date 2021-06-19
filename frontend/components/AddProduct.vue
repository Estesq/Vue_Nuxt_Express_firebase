/* eslint-disable prettier/prettier */
<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="
      newProduct({
        name,
        subcategory,
        category,
        quantity,
        price,
        description,
        image,
      })
    "
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="name"
                label="Product name"
                dense
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-file-input
                ref="image"
                v-model="image"
                label="Image files"
                show-size
                counter
                multiple
                outlined
                dense
              >
              </v-file-input>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="price"
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
                v-model="quantity"
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
                v-model="subcategory"
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
                v-model="category"
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
            v-model="description"
            solo
            rows="4"
            label="Description"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="end" class="mb-1">
        <v-btn type="submit">
          <v-progress-circular
            v-if="submitting"
            indeterminate
            color="cyan"
          ></v-progress-circular>
          Submit
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    valid: false,
    name: '',
    subcategory: '',
    category: '',
    categoryList: [],
    quantity: '',
    price: '',
    description: '',
    image: [],
    submitting: false,
  }),
  computed: {
    ...mapGetters('category', ['getDistinctSubcategories']),
  },
  created() {
    this.$store.dispatch('category/myCategories')
  },
  methods: {
    ...mapActions('product', ['addProduct', 'myProducts']),
    onChange(e) {
      this.categoryList = this.$store.getters['category/getCategories']
        .filter((el) => el.subcategory === e)
        .map((el) => el.name)
    },
    newProduct(data) {
      this.addProduct(data)
        .then(() => (this.submitting = true))
        .then(() => this.myProducts())
        .then(() => this.$refs.form.reset())
        .then(() => (this.submitting = false))
    },
  },
}
</script>

<style scoped></style>
