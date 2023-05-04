import { ref } from 'vue'
import type { Workout } from './workout'

export const measurementSystem = ref<'imperial' | 'metric'>('imperial')

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

export function displayDistanceOfWorkout(workout: Workout) {
  if (
    (workout.distanceUnit == 'miles' && measurementSystem.value == 'imperial') ||
    (workout.distanceUnit == 'kilometers' && measurementSystem.value == 'metric')
  ) {
    return workout.distance
  } else if (workout.distanceUnit == 'miles' && measurementSystem.value == 'metric') {
    return convertImperialToMetric(workout.distance)
  } else {
    return convertMetricToImperial(workout.distance)
  }
}

//Parameters are distance and the distance's type.
export function displayDistance(number: number, type: 'imperial' | 'metric') {
  if (type == 'imperial') {
    if (measurementSystem.value == 'imperial') {
      return number.toFixed(2)
    } else {
      return convertImperialToMetric(number).toFixed(2)
    }
  } else {
    if (measurementSystem.value == 'metric') {
      return number.toFixed(2)
    } else {
      return convertMetricToImperial(number).toFixed(2)
    }
  }
}

export function displayDistanceAsNumber(number: number, type: 'imperial' | 'metric') {
  return Number(displayDistance(number, type))
}
