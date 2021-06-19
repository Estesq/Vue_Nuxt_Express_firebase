<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="newCategory({ name, subcategory })"
    >
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Category name"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="5">
          <v-text-field
            v-model="subcategory"
            :rules="subRules"
            label="Subcategory"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn type="submit" dense>Add Category</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    valid: true,
    name: '',
    subcategory: '',
    nameRules: [
      (v) => !!v || 'Category is required',
      (v) => v.length <= 20 || 'Category must be less than 20 characters',
    ],
    subRules: [
      (v) => !!v || 'Subcategory is required',
      (v) => v.length <= 20 || 'Subcategory must be less than 20 characters',
    ],
  }),
  methods: {
    ...mapActions('category', ['addCategory', 'myCategories']),
    newCategory(data) {
      if (this.valid) {
        this.addCategory(data)
          .then((res) => this.$toast.success(res).goAway(3000))
          .then(() => this.myCategories())
        this.name = ''
        this.subcategory = ''
        this.$refs.form.resetValidation()
      }
    },
  },
}
</script>

<style scoped></style>
