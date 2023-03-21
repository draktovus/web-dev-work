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

// Convert miles to kilometers
export function convertImperialToMetric(number: number) {
  return number * 1.60934
}
// Convert kilometers to miles
export function convertMetricToImperial(number: number) {
  return number * 0.621371
}
