import type { DataListEnvelope } from './customFetch'
import { api } from './session'
/**
    {
      "userID": 1,
      "UID": 1,
      "title": "Daily Walk At New Paltz",
      "content": "I walked around New Paltz",
      "picture": "https://www.usnews.com/dims4/USNEWS/f5b7039/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F0d%2Fe8642fe073041e9345dd1b9d7807a5%2Fcollege-photo_14230.jpg",
      "distance": 10,
      "distanceUnit": "miles",
      "duration": 15,
      "durationUnits": "minutes",
      "location": "New Paltz",
      "date": "03-01-2023",
      "type": "Walk"
    },
*/
export interface Workout {
  _id:string
  id:string
  userID: number
  title: string
  content: string
  picture: string
  distance: number
  distanceUnit: string
  duration: number
  durationUnit: string
  location: string
  date: Date
  type: string
}

export type WorkoutForm = {
  _id:string
  userID:number
  title: string
  content: string
  picture: string
  distance: number
  distanceUnit: "miles" | 'kilometers'
  duration: number
  durationUnit: 'minutes' | 'hours' | 'seconds'
  location: string
  date: string
  type: 'run' | 'walk' | 'cardio' | 'bike' | 'strength'
}

export function getWorkouts(): Promise<DataListEnvelope<Workout>> {
  return api('workouts')
}

export function getWorkoutsByUserId(id: number): Promise<DataListEnvelope<Workout>> {
  return api('workouts/' + id)
}
