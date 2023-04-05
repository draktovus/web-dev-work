import { reactive } from 'vue'
import { useUsers } from './users'
import * as customFetch from './customFetch'

// acts as db for now
const users = useUsers()

interface User {
  name: string
  firstName: string
  lastName: string
  handle: string
  isAdmin: boolean
  emails: Array<string>
  photo: string
  id: number
  token?: string
}

const session = reactive({
  user: null as User | null,
  isLoading: false as boolean,
  messages: [] as {
    msg: string,
    type: "success" | "error" | "warning" | "info",
}[],
})

export function useSession() {
  return session
}

export function login(username: string | null, password: string | null) {
  if (username != null && password != null) {
    for (let index = 0; index < users.length; index++) {
      const element = users[index]
      if (element.name == username && element.password == password) {
        session.user = {
          name: element.name,
          firstName: element.firstName,
          lastName: element.lastName,
          handle: element.handle,
          id: element.id,
          token: element.token,
          emails: element.emails,
          photo: element.photo,
          isAdmin: element.isAdmin
        }
        console.log('Logged in!')
        //const userWorkouts = useUserWorkouts()
        //const workouts = ref<Workout[]>();
        //getWorkouts().then(data => {
        //  workouts.value = data
        //  workouts.value.forEach((workout) => {
        //    if (workout.userID == useSession().user?.id) {
        //      userWorkouts.value.push(workout)
        //    }
        //  })
        // })
        break
      }
    }
  }
}

export function logout() {
  session.user = null
  //const userWorkouts = useUserWorkouts()
  // one way to clear an array
  // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
  //userWorkouts.value.length = 0
}

export function useDB() {
  return users
}

// API
export function api(url:string, data?:any, method?:string, headers?:any){
  session.isLoading = true
  return customFetch.api(url)
  .catch(err => {
      console.error(err);
      session.messages.push({
          msg: err.message ?? JSON.stringify(err),
          type: "error",
      })
  })
  .finally(()=>{
      session.isLoading = false;
  })
}

