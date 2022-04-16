<template>
  <div>
    <input id="name" v-model="username" type="text" name="name" />
    <input id="name" v-model="password" type="password" name="name" />
    <button @click="signIn">signIn</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { API, Auth } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { listProducts } from '../graphql/queries'

export default defineComponent({
  name: 'PagesIndex',
  setup() {
    const user = ref()
    const username = ref('')
    const password = ref('')
    const signIn = async () => {
      try {
        user.value = await Auth.signIn(username.value, password.value)
        console.log('user', user.value)
        getTodos()
      } catch (e) {
        console.error(e)
      }
    }
    const getTodos = async () => {
      try {
        const { data } = (await API.graphql({
          query: listProducts,
        })) as GraphQLResult<any>
        console.log('data', data)
      } catch (e) {
        console.error(e)
      }
    }
    // getTodos()
    return {
      username,
      password,
      signIn,
    }
  },
})
</script>

<style scoped>
input {
  border: 1px solid;
}
</style>
