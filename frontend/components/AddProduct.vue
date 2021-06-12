/* eslint-disable prettier/prettier */
<template>
  <v-form
    v-model="valid"
    @submit.prevent="
      addProduct({ name, subcategory, category, quantity, price, description })
    "
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Product name"
                dense
                outlined
                required
              ></v-text-field>
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
      <v-row justify="center">
        <v-btn type="submit">Submit</v-btn>
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
    nameRules: [
      (v) => !!v || 'Product is required',
      (v) => v.length <= 50 || 'Product must be less than 20 characters',
    ],
  }),
  computed: {
    ...mapGetters('category', ['getDistinctSubcategories']),
  },
  created() {
    this.$store.dispatch('category/myCategories')
  },
  methods: {
    ...mapActions('product', ['addProduct']),
    onChange(e) {
      this.categoryList = this.$store.getters['category/getCategories']
        .filter((el) => el.subcategory === e)
        .map((el) => el.name)
    },
  },
}
</script>

<style scoped></style>
