import {useWorkouts, type Workout} from '@/models/workout'
import { computed, reactive, ref } from 'vue'
import { useSession } from './session'

const userWorkouts = ref([]as Workout[])
export const workouts = reactive(useWorkouts())

workouts.forEach((workout)=>{
  if (workout.userID == useSession().user?.id) {
    userWorkouts.value.push(workout)
  }
})

export function useUserWorkouts(){
  return userWorkouts
}

export const todayStatsDistance = computed(() => userWorkouts.value.reduce((total, item) => total + item.distance, 0));
