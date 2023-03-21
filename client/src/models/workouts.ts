import { useWorkouts, type Workout } from '@/models/workout'
import { computed, reactive, ref } from 'vue'

const userWorkouts = ref([] as Workout[])
export const workouts = reactive(useWorkouts())

export function useUserWorkouts() {
  return userWorkouts
}

//Using this website for the formula to determine calories
//https://blog.nasm.org/metabolic-equivalents-for-weight-loss
//METS X 3.5 X BW (KG) / 200 = KCAL/MIN.\
/** Running: 11.5
 * Walking: 2.0
 * Biking: 8.0
 * Cardio: 10.0
 * Strength: 9.0
 */
const METS = {
  running: 11.5,
  walking: 2.0,
  biking: 8.0,
  cardio: 10.0,
  strength: 9.0
}
const weight = 81
const AllTimeStatsDistance = computed(() =>
  userWorkouts.value.reduce((totalDistance, item) => totalDistance + item.distance, 0)
)

const AllTimeStatsDuration = computed(() => {
  let [seconds, minutes, hours] = [0, 0, 0]

  userWorkouts.value.forEach((workout) => {
    if (workout.durationUnit == 'seconds') {
      seconds += workout.duration
    } else if (workout.durationUnit == 'minutes') {
      minutes += workout.duration
    } else if (workout.durationUnit == 'hours') {
      hours += workout.duration
    }
  })

  return (
    `${hours < 10 ? `0${hours}` : hours.toString()}:` +
    `${minutes < 10 ? `0${minutes}` : minutes.toString()}:` +
    `${seconds < 10 ? `0${seconds}` : seconds.toString()}`
  )
})
const AllTimeStatsPace = computed(() =>
  userWorkouts.value.reduce((total, item) => total + item.duration, 0).toFixed(2)
)
const AllTimeStatsCalories = computed(() =>
  userWorkouts.value.reduce((total, workout) => {
    if (workout.type == 'Run') {
      return total + ((METS.running * 3.5 * weight) / 200) * workout.duration
    } else if (workout.type == 'Walk') {
      return total + ((METS.walking * 3.5 * weight) / 200) * workout.duration
    } else if (workout.type == 'Bike') {
      return total + ((METS.biking * 3.5 * weight) / 200) * workout.duration
    } else if (workout.type == 'Cardio') {
      return total + ((METS.cardio * 3.5 * weight) / 200) * workout.duration
    } else {
      return total + ((METS.strength * 3.5 * weight) / 200) * workout.duration
    }
  }, 0)
)
const stats = reactive({
  Today: {
    distance: AllTimeStatsDistance,
    duration: AllTimeStatsDuration,
    pace: AllTimeStatsPace,
    calories: AllTimeStatsCalories
  },
  Week: {
    distance: AllTimeStatsDistance,
    duration: AllTimeStatsDuration,
    pace: AllTimeStatsPace,
    calories: AllTimeStatsCalories
  },
  'All Time': {
    distance: AllTimeStatsDistance,
    duration: AllTimeStatsDuration,
    pace: AllTimeStatsPace,
    calories: AllTimeStatsCalories
  }
})

export function useTodayStats() {
  return stats.Today
}

export function useStats() {
  return stats
}
