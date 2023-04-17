<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUser, updateUser, type User } from '@/models/users'
import { addMessage } from '@/models/session'

const user = ref<User>({} as User)
const route = useRoute()
getUser(+route.params.id).then((data) => {
  user.value = data.data
})

function save() {
  if (user.value.id) {
    updateUser(user.value).then((data) => {
      console.log(data)
      addMessage('User updated', 'success')
    })
  } else {
    console.log(user)
  }
}
</script>

<template>
  <form class="form" @submit.prevent="save">
    <h1 class="title" v-if="user.id">Edit Product</h1>
    <h1 class="title" v-else>Add Product</h1>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="First name" v-model="user.firstName" />
      </div>
    </div>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Last name" v-model="user.lastName" />
      </div>
    </div>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Username" v-model="user.name" />
      </div>
    </div>

    <div class="field">
      <label class="label">Stock</label>
      <div class="control">
        <input class="input" type="text" placeholder="Handle" v-model="user.handle" />
      </div>
    </div>

    <div class="field">
      <label class="label">Price</label>
      <div class="control">
        <input class="input" type="text" placeholder="Picture" v-model="user.photo" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
