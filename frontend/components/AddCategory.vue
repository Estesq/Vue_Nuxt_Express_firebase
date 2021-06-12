<template>
  <v-form v-model="valid" @submit.prevent="addCategory({ name, subcategory })">
    <v-container>
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
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    valid: false,
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
    ...mapActions('category', ['addCategory']),
  },
}
</script>

<style scoped></style>
