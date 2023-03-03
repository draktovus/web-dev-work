<script setup lang="ts">
import { useSession, logout } from '@/models/session'
import { RouterLink } from 'vue-router'

const session = useSession()
</script>

<template>
  <div class="navbar-item" v-if="session.user">
    <div class="field is-grouped">
      <p class="control">
        <button class="button is-dark">Hello, {{ session.user.name }}</button>
      </p>
      <p class="control">
        <button class="button button-tw-button" @click="logout">Logout</button>
      </p>
    </div>
  </div>

  <div class="navbar-item" v-else>
    <div class="field is-grouped">
      <p class="control">
        <RouterLink to="/login" class="bd-tw-button button">
          <span class="icon">
            <i class="fas fa-user-plus"></i>
          </span>
          <span>Login</span>
        </RouterLink>
      </p>
      <p class="control">
        <RouterLink to="/login" class="bd-tw-button button">
          <span>Sign up</span>
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
