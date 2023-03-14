import { useWorkouts, type Workout } from '@/models/workout'
import { computed, reactive, ref } from 'vue'

const userWorkouts = ref([] as Workout[])
export const workouts = reactive(useWorkouts())

export function useUserWorkouts() {
  return userWorkouts
}

export const todayStatsDistance = computed(() =>
  userWorkouts.value.reduce((total, item) => total + item.distance, 0)
)
