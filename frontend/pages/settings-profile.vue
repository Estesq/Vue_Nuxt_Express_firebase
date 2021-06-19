<template>
  <ProfileComponent />
</template>
<script>
import ProfileComponent from '../components/ProfileComponent'
export default {
  components: { ProfileComponent },
  layout: 'sidebar',
  data: () => {
    return {}
  },
  head: {
    title: 'Update Profile',
  },
  mounted() {
    console.log(this.$auth.user)
  },
}
</script>

<style scoped></style>
