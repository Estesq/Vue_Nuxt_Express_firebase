<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6" v-text="title" />
          <v-list-item-subtitle> {{ userName }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :class="{ noindicator: !item.items }"
          link
        >
          <template #activator>
            <v-list-item :to="item.link">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.link"
          >
            <v-list-item-content class="pl-5">
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn text
        ><v-avatar><v-img :src="userPic"></v-img></v-avatar
      ></v-btn>
      <v-icon medium color="red" @click="logout">mdi-logout</v-icon>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    title: 'ZeltaPay',
    drawer: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/' },
      {
        title: 'Category',
        icon: 'mdi-shape',
        items: [
          { title: 'Add', action: 'mdi-plus-box', link: '/category-add' },
          { title: 'Update', action: 'mdi-update', link: '/category-update' },
          {
            title: 'Delete',
            action: 'mdi-delete-forever',
            link: '/category-delete',
          },
        ],
      },
      {
        title: 'Product',
        icon: 'mdi-store',
        items: [
          { title: 'Add', action: 'mdi-plus-box', link: '/product-add' },
          { title: 'Update', action: 'mdi-update', link: '/product-update' },
          {
            title: 'Delete',
            action: 'mdi-delete-forever',
            link: '/product-delete',
          },
        ],
      },
      {
        title: 'Settings',
        icon: 'mdi-shield-account',
        link: '/settings-profile',
      },
      { title: 'About', icon: 'mdi-help-box' },
    ],
  }),
  computed: {
    userPic() {
      return this.$auth.user.photoURL
        ? this.$auth.user.photoURL
        : this.$auth.user.displayName
        ? `https://ui-avatars.com/api/?name=${this.$auth.user.displayName}`
        : `https://ui-avatars.com/api/?name=${
            this.$auth.user.email.split('@')[0]
          }`
    },
    userName() {
      return this.$auth.user.displayName
        ? this.$auth.user.displayName
        : this.$auth.user.email.split('@')[0]
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
<style>
.noindicator .v-list-item .v-list-item__icon {
  display: none;
}
.noindicator .v-list-group__header {
  padding: 0;
}
.noindicator .v-list-group__header .v-list-item {
  padding: 0 32px;
}
</style>
