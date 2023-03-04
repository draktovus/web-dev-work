<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
//import axios from 'axios'
import TheFooter from './components/TheFooter.vue'

/*async function apiRequest(){
  try {
    const res = await axios.get(`http://127.0.0.1:3000/`)
    data.msg = res.data.message
    data.title = res.data.title
  } catch (err) {
    console.log(err)
  }
}
apiRequest()
*/
</script>

<template>
  <NavBar />
  <div class="container mt-2">
    <RouterView />
  </div>
  <TheFooter />
</template>

<style scoped>
.container {
  min-height: 82vh;
}
</style>
