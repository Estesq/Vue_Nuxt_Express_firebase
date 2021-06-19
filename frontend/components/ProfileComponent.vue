<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-flex>
          <v-card>
            <v-layout>
              <v-avatar size="300" class="mx-auto my-5">
                <v-img :src="avatar" rounded />
              </v-avatar>
            </v-layout>
            <v-card-actions>
              <v-container>
                <v-row justify="center">
                  <v-col cols="12" md="4">
                    <v-file-input
                      v-model="buttonModel"
                      accept="image/png, image/jpeg, image/jpg"
                      label="Replace"
                      placeholder="REPLACE"
                      prepend-icon="mdi-file-replace-outline"
                      dense
                      outlined
                      filled
                      clearable
                      @change="(e) => updatePic(e)"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-layout>
                      <v-icon medium class="mx-2"> mdi-file-remove </v-icon>
                      <v-btn block dense> Remove </v-btn>
                    </v-layout>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title> Email</v-card-title>
          <v-card-subtitle v-if="!emailField" @click="(e) => emailToggle(e)">
            {{ this.$auth.user.email }}
          </v-card-subtitle>
          <v-text-field
            v-if="emailField"
            class="mx-5"
            :v-model="field"
            :value="this.$auth.user.email"
            autofocus
            append-icon="mdi-content-save"
            dense
            @blur="(e) => emailToggle(e)"
          />
        </v-card>
        <v-divider class="my-3" />
        <v-card>
          <v-card-title> Password </v-card-title>
          <v-card-subtitle v-if="!passField" @click="(e) => passToggle(e)">
            **************
          </v-card-subtitle>
          <v-text-field
            v-if="passField"
            class="mx-5"
            :v-model="field"
            :value="password"
            autofocus
            append-icon="mdi-content-save"
            dense
            @blur="(e) => passToggle(e)"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: { field: { type: String } },
  data() {
    return {
      emailField: false,
      passField: false,
      password: '',
      email: '',
      buttonModel: null,
    }
  },
  computed: {
    avatar() {
      return this.$auth.user.photoURL
        ? this.$auth.user.photoURL
        : this.$auth.user.displayName
        ? `https://ui-avatars.com/api/?name=${this.$auth.user.displayName}`
        : `https://ui-avatars.com/api/?name=${
            this.$auth.user.email.split('@')[0]
          }`
    },
  },
  watchQuery: true,
  methods: {
    ...mapActions('user', ['update', 'updatePhotoUrl']),
    emailToggle(e) {
      console.log(e)
      if (e.target.value) {
        this.update({ email: e.target.value })
          .then(async (res) => {
            const userdata = await this.$auth.fetchUser()
            this.$auth.setUser(userdata.data.user)
            return res
          })
          .then((res) => {
            this.$toast.success(`🏆${res.data.message}`).goAway(3000)
          })
      }
      this.emailField = !this.emailField
    },
    passToggle(e) {
      if (e.target.value) {
        if (e.target.value.length > 8) {
          this.update({ password: e.target.value }).then((res) =>
            this.$toast.success(res.data.message).goAway(3000)
          )
        } else {
          this.$toast.error('Something went wrong!').goAway(3000)
        }
      }
      this.passField = !this.passField
    },
    updatePic(e) {
      console.log(e)
      this.updatePhotoUrl(e)
        .then(async (res) => {
          const userdata = await this.$auth.fetchUser()
          this.$auth.setUser(userdata.data.user)
          return res
        })
        .then((res) => {
          this.$toast.success(`🏆 ${res.data.message}`).goAway(3000)
        })
      this.buttonModel = null
    },
  },
}
</script>

<style scoped>
.v-card__title {
  text-transform: capitalize;
}
.v-btn-add-avatar {
  min-width: 100% !important;
}
</style>
