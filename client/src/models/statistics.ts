import { computed, reactive, ref } from 'vue'
import { convertMetricToImperial, convertImperialToMetric, measurementSystem } from './measurement'
import type { Workout } from '@/models/workout'

const userWorkouts = ref([] as Workout[])
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
const AllTimeStatsDistance = computed(() => {
  const distanceImperial = userWorkouts.value.reduce((totalDistance, item) => {
    if (item.distanceUnit == 'miles') {
      return totalDistance + item.distance
    } else {
      return totalDistance + convertMetricToImperial(item.distance)
    }
  }, 0)
  if (measurementSystem.value == 'imperial') {
    return distanceImperial.toFixed(2)
  } else {
    return convertImperialToMetric(distanceImperial).toFixed(2)
  }
})

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

  //Convert minutes into hours
  if (minutes > 0) {
    hours += Math.floor(minutes / 60)
    minutes = minutes % 60
  }
  if (seconds > 0) {
    // Convert excess seconds into appropriate hours/minutes
    hours += Math.floor(seconds / 3600)
    seconds = seconds % 3600
    minutes += Math.floor(seconds / 60)
    seconds = seconds % 60
  }

  return (
    `${hours < 10 ? `0${hours}` : hours.toString()}:` +
    `${minutes < 10 ? `0${minutes}` : minutes.toString()}:` +
    `${seconds < 10 ? `0${seconds}` : seconds.toString()}`
  )
})
const AllTimeStatsPace = computed(() =>
  {
    //Get distance
    const dist = Number.parseInt(AllTimeStatsDistance.value)
    //Get duration in seconds
    let seconds = 0

    userWorkouts.value.forEach((workout) => {
      if (workout.durationUnit == 'seconds') {
        seconds += workout.duration
      } else if (workout.durationUnit == 'minutes') {
        seconds += (workout.duration * 60)
      } else if (workout.durationUnit == 'hours') {
        seconds += (workout.duration * 3600)
      }
    })

    // Divide v = d/t
    const pace = (dist / seconds) * (60/1) * (60/1)
    return pace.toFixed(2)
  }
  
)
const AllTimeStatsCalories = computed(() =>
  userWorkouts.value
    .reduce((total, workout) => {
      if (workout.type == 'run') {
        return total + ((METS.running * 3.5 * weight) / 200) * workout.duration
      } else if (workout.type == 'walk') {
        return total + ((METS.walking * 3.5 * weight) / 200) * workout.duration
      } else if (workout.type == 'bike') {
        return total + ((METS.biking * 3.5 * weight) / 200) * workout.duration
      } else if (workout.type == 'cardio') {
        return total + ((METS.cardio * 3.5 * weight) / 200) * workout.duration
      } else {
        return total + ((METS.strength * 3.5 * weight) / 200) * workout.duration
      }
    }, 0)
    .toFixed(2)
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

export function calcStats(UserWorkouts:Workout[]){
  userWorkouts.value = UserWorkouts
  return stats
}