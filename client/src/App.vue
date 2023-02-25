<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { reactive } from 'vue'
import axios from 'axios'
import HelloWorld from './components/HelloWorld.vue'
import TheFooter from './components/TheFooter.vue'

const data = reactive({
  msg: '',
  title: ''
})

async function apiRequest(){
  try {
    const res = await axios.get(`http://127.0.0.1:3000/`)
    data.msg = res.data.message
    data.title = res.data.title
  } catch (err) {
    console.log(err)
  }
}
apiRequest()

</script>

<template>
  <NavBar />
  <HelloWorld :title="data.title" :msg="data.msg"></HelloWorld>
  <div class="container mt-2 is-flex is-flex-direction-column">
    <RouterView />
  </div>
  <TheFooter />
</template>

<style scoped>
.container{
  min-height: 82vh;
}
</style>
