import workouts from '@/data/workouts.json'
/**
    {
        "userID": 1,
        "title": "hooray!",
        "content": "yes sir",
        "picture": "https://www.usnews.com/dims4/USNEWS/f5b7039/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F0d%2Fe8642fe073041e9345dd1b9d7807a5%2Fcollege-photo_14230.jpg",
        "distance": "10 miles",
        "duration": "15 minutes",
        "distanceUnit": "miles",
        "date": "03-07-2023",
        "type": "Cardio"
    }
*/
export interface Workout {
  userID: number
  title: string
  content: string
  picture: string
  distance: number
  distanceUnit: string,
  duration: string
  location: string
  date: string
  type: string
}

export function useWorkouts(): Workout[] {
  return workouts.workouts
}