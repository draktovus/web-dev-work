import { ref } from "vue";

export const measurementSystem = ref("imperial")

export function toggleMeasurement(){
    if (measurementSystem.value=="imperial") {
        measurementSystem.value="metric"
    }else{
        measurementSystem.value="imperial"
    }
}