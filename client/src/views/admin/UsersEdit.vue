<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, addUser, updateUser, type User } from '@/models/users'
import { addMessage } from '@/models/session'

const user = ref<User>({} as User)
const route = useRoute()

if (route.params.id !== "") {
  getUser(route.params.id as string).then((data) => {
    user.value = data.data ?? ({} as User)
  })
}

const router = useRouter()

function save() {
  if (user.value._id) {
    updateUser(user.value).then((data) => {
      console.log(data)
      addMessage('User updated', 'success')
    })
  } else {
    // add user to db
    addUser(user.value).then((data) => {
      console.log(data)
      addMessage('Added user ' + data.data.name, 'success')
    })
  }
  router.push('/admin/users/')
}

function cancel() {
  router.push('/admin/users/')
  addMessage('Canceled adding/editing user.', 'warning')
}
</script>

<template>
  <div>
    <form class="form" @submit.prevent>
      <h1 class="title" v-if="user._id">Edit User</h1>
      <h1 class="title" v-else>Add User</h1>

      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="john" v-model="user.firstName" />
        </div>
      </div>
      <div class="field">
        <label class="label">Last name</label>
        <div class="control">
          <input class="input" type="text" placeholder="doe" v-model="user.lastName" />
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" placeholder="johndoe" v-model="user.name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="text" placeholder="secure password" v-model="user.password" />
        </div>
      </div>

      <div class="field">
        <label class="label">Emails</label>
        <div class="control">
          <input class="input" type="text" placeholder="email" v-model="user.emails" />
        </div>
      </div>

      <div class="field">
        <label class="label">Handle</label>
        <div class="control">
          <input class="input" type="text" placeholder="@username" v-model="user.handle" />
        </div>
      </div>

      <div class="field">
        <label class="label">Profile Picture</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="https://robohash.org/96.233.201.188.png"
            v-model="user.photo"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Is Admin</label>
        <div class="field is-grouped">
          <div class="control">
            <label class="radio button">
              <input type="radio" name="admin" v-model="user.isAdmin" :value="true">
              True
            </label>
            <label class="radio button">
              <input type="radio" name="admin" v-model="user.isAdmin" :value="false">
              False
            </label>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="save">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="cancel">Cancel</button>
        </div>
      </div>
      
    </form>
  </div>
</template>

<style scoped></style>
