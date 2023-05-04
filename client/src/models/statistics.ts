import { computed, reactive, ref } from 'vue'
import { convertMetricToImperial, displayDistance, measurementSystem } from './measurement'
import type { Workout } from '@/models/workout'

const userWorkouts = ref([] as Workout[])
const weekWorkouts = ref([] as Workout[])
const todayWorkouts = ref([] as Workout[])
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
const weight = ref(-1)

export function updateWeight(num: number) {
  weight.value = num
}

// DISTANCE STATS
// Returns an imperial distance.
function calculateDistance(array: Array<Workout>) {
  return array.reduce((totalDistance, item) => {
    if (item.distanceUnit == 'miles') {
      return totalDistance + item.distance
    } else {
      return totalDistance + convertMetricToImperial(item.distance)
    }
  }, 0)
}
const todayDistance = computed(() => {
  const distanceImperial = calculateDistance(todayWorkouts.value)
  return displayDistance(distanceImperial, 'imperial')
})
const weekDistance = computed(() => {
  const distanceImperial = calculateDistance(weekWorkouts.value)
  return displayDistance(distanceImperial, 'imperial')
})
const AllTimeStatsDistance = computed(() => {
  const distanceImperial = calculateDistance(userWorkouts.value)
  return displayDistance(distanceImperial, 'imperial')
})

// DURATION STATS
function calculateDuration(array: Array<Workout>) {
  let [seconds, minutes, hours] = [0, 0, 0]

  array.forEach((workout) => {
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
}
const todayDuration = computed(() => {
  const duration = calculateDuration(todayWorkouts.value)

  return `${duration}`
})
const weekDuration = computed(() => {
  const duration = calculateDuration(weekWorkouts.value)

  return `${duration}`
})
const AllTimeStatsDuration = computed(() => {
  const duration = calculateDuration(userWorkouts.value)

  return `${duration}`
})

// PACE STATS
function calculatePace(array: Array<Workout>, distance: number) {
  // Get duration in seconds
  let seconds = 0

  array.forEach((workout) => {
    if (workout.durationUnit == 'seconds') {
      seconds += workout.duration
    } else if (workout.durationUnit == 'minutes') {
      seconds += workout.duration * 60
    } else if (workout.durationUnit == 'hours') {
      seconds += workout.duration * 3600
    }
  })
  if (seconds == 0) {
    return 0
  }

  // Divide v = d/t
  const pace = (distance / seconds) * (60 / 1) * (60 / 1)
  return pace.toFixed(2)
}
const todayPace = computed(() => {
  return calculatePace(todayWorkouts.value, +todayDistance.value)
})
const weekPace = computed(() => {
  return calculatePace(weekWorkouts.value, +weekDistance.value)
})
const AllTimeStatsPace = computed(() => {
  return calculatePace(userWorkouts.value, +AllTimeStatsDistance.value)
})

// CALORIES STATS
export function calculateWorkoutCalories(workout: Workout) {
  // calcualted using metric
  let calories = 0
  const time = workout.duration
  const timeType = workout.durationUnit
  let convertedTime = workout.duration // assume its minutes
  // covnert to minutes
  if (timeType == 'seconds') {
    convertedTime = time / 60
  } else if (timeType == 'hours') {
    convertedTime = time * 60
  }
  switch (workout.type) {
    case 'run':
      calories = ((METS.running * 3.5 * weight.value) / 200) * convertedTime
      break
    case 'walk':
      calories = ((METS.walking * 3.5 * weight.value) / 200) * convertedTime
      break
    case 'bike':
      calories = ((METS.biking * 3.5 * weight.value) / 200) * convertedTime
      break
    case 'cardio':
      calories = ((METS.cardio * 3.5 * weight.value) / 200) * convertedTime
      break
    case 'strength':
      calories = ((METS.strength * 3.5 * weight.value) / 200) * convertedTime
      break
    default:
      calories = ((3 * 3.5 * weight.value) / 200) * convertedTime
      break
  }

  return calories
}
function calculateCalories(array: Array<Workout>) {
  return array.reduce((total, workout) => {
    return total + calculateWorkoutCalories(workout)
  }, 0)
}
const todayCalories = computed(() => calculateCalories(todayWorkouts.value).toFixed(2))
const weekCalories = computed(() => calculateCalories(weekWorkouts.value).toFixed(2))
const AllTimeStatsCalories = computed(() => calculateCalories(userWorkouts.value).toFixed(2))
const stats = reactive({
  Today: {
    distance: todayDistance,
    duration: todayDuration,
    pace: todayPace,
    calories: todayCalories
  },
  Week: {
    distance: weekDistance,
    duration: weekDuration,
    pace: weekPace,
    calories: weekCalories
  },
  'All Time': {
    distance: AllTimeStatsDistance,
    duration: AllTimeStatsDuration,
    pace: AllTimeStatsPace,
    calories: AllTimeStatsCalories
  }
})

export function useStats() {
  return stats
}

export function calcStats(UserWorkouts: Workout[]) {
  const today = new Date()

  userWorkouts.value = UserWorkouts
  //console.log(today.toUTCString())
  weekWorkouts.value = userWorkouts.value.filter((e) => {
    const date = new Date(e.date)
    //console.log(e.title)
    //console.log(date.toUTCString())
    //console.log(
    //  today.getUTCDate() - date.getUTCDate() <= 7 &&
    //    today.getUTCMonth() == date.getUTCMonth() &&
    //    today.getUTCFullYear() == date.getUTCFullYear()
    //)
    return (
      today.getUTCDate() - date.getUTCDate() <= 7 &&
      today.getUTCMonth() == date.getUTCMonth() &&
      today.getUTCFullYear() == date.getUTCFullYear()
    )
  })
  todayWorkouts.value = userWorkouts.value.filter((e) => {
    const date = new Date(e.date)
    //console.log(e.title)
    //console.log(date.toUTCString())
    //console.log(today.getDate() - date.getDate())
    return (
      today.getUTCDate() - date.getUTCDate() == 0 &&
      today.getUTCMonth() == date.getUTCMonth() &&
      today.getUTCFullYear() == date.getUTCFullYear()
    )
  })

  // console.log('All Time: ', userWorkouts, '\nWeekly: ', { weekWorkouts }, '\nToday: ', {
  //   todayWorkouts
  // })
}

// Assumes month is 1-12, not 0-11 like javascript.
// Does not account for different years, which is a bug.
// To account for this, a second paramater for a specified year could work.
export function getDistancesByMonth(month:number){
  month = month - 1
  const workoutsMonth = userWorkouts.value.filter((entry) => {
    const date = new Date(entry.date)
    return date.getUTCMonth() == month
  })
  return calculateDistance(workoutsMonth)
}
