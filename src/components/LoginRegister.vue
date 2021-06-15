<template>
<q-page>
<q-form @submit="submitForm">
    <q-input
    v-if="tab == 'register'"
    class="q-mb-md"
    color="black"
    outlined
    v-model="formData.name"
    label="Name"
    :rules="[val => !!val || 'Name should be at least 3 characters']"
    />
    <q-input
    class="q-mb-md"
    color="black"
    outlined
    type="email"
    v-model="formData.email"
    label="Email"
    :rules="[val => !!val || 'Email is invalid']"
    />
    <q-input
    class="q-mb-md"
    color="black"
    outlined
    type="password"
    v-model="formData.password"
    label="Password"
    :rules="[val => !!val || 'Password is invalid']"
    />
    <div class="row relative-position q-pt-lg">
        <q-btn class="glossy absolute-center"
        rounded
        color="secondary"
        text-color="black"
        type="submit"
        :label="tab" />
    </div>
</q-form>
</q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['tab'],
  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('store', ['registerUser', 'loginUser']),
    submitForm () {
      if (this.tab === 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>

<style>
.q-placeholder{
  color: black !important;
}
</style>
