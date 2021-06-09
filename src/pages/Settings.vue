<template>
  <q-page
  v-if="userDetails.userId"
   class="flex flex-center column">
    <p>Settings page</p>
    <p>Just some stuff for linking pages</p>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('store', ['userDetails'])
  }
}
</script>
