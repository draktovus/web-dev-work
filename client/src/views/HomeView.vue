<script setup lang="ts">
import { useSession } from '@/models/session'
import BasicStatistics from '../components/BasicStatistics.vue'

const session = useSession()
</script>

<template>
  <div class="box">
    <div class="content" v-if="!session.user">
      <p>
        To login, press login at the top right.<br />
        <br />Username: manuelnreyes<br />Password: wasd123<br />
        <br />Username: juan<br />Password: wasd123
      </p>
    </div>
    <div class="content" v-else>
      <p>
        Welcome, {{ session.user.name }}! You are logged in. Here is a some statistics on your
        workouts.
      </p>
      <BasicStatistics />
    </div>
  </div>
</template>
