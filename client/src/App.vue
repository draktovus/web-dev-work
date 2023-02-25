<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { reactive } from 'vue';
import axios from 'axios';
import  HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';

const data = reactive({
    msg:"",
    title:"",
  }
)
onMounted(async ()=>{
  try {
    const res = await axios.get(`http://127.0.0.1:3000/`)
    data.msg = res.data.message
    data.title = res.data.title
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <NavBar />
  <HelloWorld :title="data.title" :msg="data.msg"></HelloWorld>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
