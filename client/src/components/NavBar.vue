<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar is-dark">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/">
          <span class="icon-text">
            <span class="icon">
              <i class="fa fa-house"></i>
            </span>
            <span> Home </span>
          </span>
        </RouterLink>
        <button id="navbar-burger" class="navbar-burger" data-target="navbarMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="navbar-menu" id="navbarMenu">
        <!-- needs is-active to be shown on mobile -->
        <div class="navbar-start">
          <RouterLink class="navbar-item" to="/profile">
            <span class="icon-text">
              <span class="icon"><i class="fa-solid fa-user"></i></span>
              <span>Profile</span>
            </span>
          </RouterLink>

          <div class="navbar-item has-dropdown is-hoverable">
            <RouterLink class="navbar-link" to="/about">
              <span class="icon-text">
                <span class="icon">
                  <i class="fa-solid fa-circle-info"></i>
                </span>
                <span>About</span>
              </span>
            </RouterLink>

            <div class="navbar-dropdown">
              <RouterLink class="navbar-item" to="/">1</RouterLink>
              <RouterLink class="navbar-item" to="/">2</RouterLink>
              <hr class="navbar-divider" />
              <RouterLink class="navbar-item" to="/">3</RouterLink>
              <RouterLink class="navbar-item" to="/">4</RouterLink>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <RouterLink to="/login">
                  <a class="bd-tw-button button">
                    <span class="icon">
                      <i class="fa-solid fa-right-to-bracket"></i>
                    </span>
                    <span>Login</span>
                  </a>
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
