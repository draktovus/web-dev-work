import { reactive } from 'vue'

// acts as db for now
const users: [UserDB] = [
  {
    name: 'manuelnreyes',
    firstName: 'Manuel',
    lastName: 'Reyes',
    password: 'wasd123',
    handle: '@TheManuelReyes',
    isAdmin: true,
    emails: ['manuel@google.com'],
    photo:
      'https://media.comicbook.com/2019/05/gintama-gintoki-1172688.jpeg?auto=webp&width=1200&height=628&crop=1200:628,smart'
  }
]

interface User {
  name: string
  firstName: string
  lastName: string
  handle: string
  isAdmin: boolean
  emails: [string]
  photo?: string
  id?: string
  token?: string
}

interface UserDB extends User {
  password: string
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
