<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginBadge from './LoginBadge.vue'
import { useSession } from '@/models/session'
import MeasurementSystem from './MeasurementSystem.vue'

const session = useSession()

const isMobileMenuActive = ref(false)
function toggleMenu() {
  isMobileMenuActive.value = !isMobileMenuActive.value
}
</script>

<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <span class="icon-text">
          <span class="icon">
            <i class="fa fa-house"></i>
          </span>
          <span> Home </span>
        </span>
      </RouterLink>
      <button
        id="navbar-burger"
        class="navbar-burger"
        :class="{ 'is-active': isMobileMenuActive }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMobileMenuActive }">
      <!-- needs is-active to be shown on mobile -->
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/profile">
          <span class="icon-text">
            <span class="icon"><i class="fa-solid fa-user"></i></span>
            <span>Profile</span>
          </span>
        </RouterLink>
        <RouterLink class="navbar-item" to="/statistics">
          <span class="icon-text">
            <span class="icon"><i class="fas fa-chart-line"></i></span>
            <span>Statistics</span>
          </span>
        </RouterLink>
        <RouterLink class="navbar-item" to="/friends">
          <span class="icon-text">
            <span class="icon"><i class="fas fa-people-group"></i></span>
            <span>Friend Activity</span>
          </span>
        </RouterLink>
        <div class="navbar-item has-dropdown is-hoverable" v-if="session.user?.isAdmin">
          <a class="navbar-link"> Admin </a>

          <div class="navbar-dropdown">
            <RouterLink class="navbar-item" to="/admin/users">Users</RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <MeasurementSystem></MeasurementSystem>
        <LoginBadge />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
