import { ref } from 'vue'

export const measurementSystem = ref('imperial')

export function toggleMeasurement() {
  if (measurementSystem.value == 'imperial') {
    measurementSystem.value = 'metric'
  } else {
    measurementSystem.value = 'imperial'
  }
}

export function getDistanceUnit() {
  if (measurementSystem.value == 'imperial') {
    return 'Miles'
  } else {
    return 'Kilometers'
  }
}

export function getPaceUnit() {
  if (measurementSystem.value == 'imperial') {
    return 'MPH'
  } else {
    return 'KPH'
  }
}
