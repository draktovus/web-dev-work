<script setup lang="ts">
import { ref } from 'vue'
const isModalActive = ref(false)

function toggleModal(){
  isModalActive.value = !isModalActive.value
}
defineProps<{
  title: string
  msg: string
}>()
</script>

<template>
  <div class="modal" :class="{'is-active':isModalActive}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        {{ title }}
      {{ msg }}
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
  </div>
</template>

<style scoped></style>
