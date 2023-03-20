<script setup lang="ts">
import {measurementSystem, toggleMeasurement} from '@/models/measurement'

let measurement = measurementSystem

function toggle(){
    toggleMeasurement()
}
</script>

<template>
    <div class="navbar-item">
        <div class="button" v-if="measurement==`imperial`" @click="toggle">
            Imperial
        </div>
        <div class="button" v-else @click="toggle">
            Metric
        </div>
    </div>
</template>

<style scoped>

</style>