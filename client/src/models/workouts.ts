import {useWorkouts, type Workout} from '@/models/workout'
import { computed, ref } from 'vue'
import { useSession } from './session'

const workouts = useWorkouts()

const userWorkouts = ref([]as Workout[])

workouts.forEach((workout)=>{
  if (workout.userID == useSession().user?.id) {
    userWorkouts.value.push(workout)
  }
})

export const todayStatsDistance = computed(() => userWorkouts.value.reduce((total, item) => total + Number(item.distance), 0));
