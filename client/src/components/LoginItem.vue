<script setup lang="ts">
import { useLogin, useSession } from '@/models/session'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const session = useSession()
const user = reactive({
  name: '' as string,
  password: '' as string
})

const login = useLogin()
</script>

<template>
  <div class="box container">
    <div class="field">
      <label class="label is-size-3">Login</label>
    </div>
    <div class="field">
      <label for="" class="label">Username</label>
      <div class="control has-icons-left">
        <input class="input" type="text" name="" id="" placeholder="Username" v-model="user.name" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Password</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="password"
          name=""
          id=""
          placeholder="Password"
          v-model="user.password"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <button class="button is-success" @click="login(user)">Login</button>
      </p>
      <p class="control">
        <button class="button is-info">Sign Up</button>
      </p>
    </div>
  </div>
</template>
