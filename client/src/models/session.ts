import { reactive } from 'vue'
import { useUsers } from './users'

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
  user: null as User | null
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
        break
      }
    }
  }
}

export function logout() {
  session.user = null
}

export function useDB() {
  return users
}
