<script setup lang="ts">
import { useSession, logout } from '@/models/session'
import { RouterLink } from 'vue-router'

const session = useSession()
</script>

<template>
  <div class="navbar-item" v-if="session.user">
    <div class="field is-grouped is-grouped-centered">
      <div class="button is-black">
        <span class="image">
          <img class="is-rounded" :src="session.user.photo" alt="pic" />
        </span>
        <span> Hello, {{ session.user.name }} </span>
      </div>
      <button class="button button-tw-button" @click="logout">Logout</button>
    </div>
  </div>

  <div class="navbar-item" v-else>
    <div class="buttons">
      <RouterLink to="/login" class="bd-tw-button button">
        <span class="icon">
          <i class="fas fa-user-plus"></i>
        </span>
        <span>Login</span>
      </RouterLink>
      <RouterLink to="/login" class="bd-tw-button button">
        <span>Sign up</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
