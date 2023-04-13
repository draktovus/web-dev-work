import { reactive } from 'vue'
import { useUsers } from './users'
import * as customFetch from './customFetch'
import { useRouter } from 'vue-router'

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
    type: "success" | "danger" | "warning" | "info",
  }[],
  redirectUrl: null as string | null,
})

export function useSession() {
  return session
}

export function useLogin() {
  const router = useRouter();

  return function (username:string|null,password:string|null) {
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
        }
      }
    }
    router.push(session.redirectUrl ?? "/");
    session.redirectUrl = null;
  }
}

export function useLogout() {
  const router = useRouter()
  return function () {
    session.user = null;

    router.push('/login')
  }
}

export function useDB() {
  return users
}

// API
export function api(url: string, data?: any, method?: string, headers?: any) {
  session.isLoading = true
  return customFetch
    .api(url, data, method, headers)
    .catch((err) => {
      console.error(err)
      session.messages.push({
        msg: err.message ?? JSON.stringify(err),
        type: 'danger'
      })
    })
    .finally(() => {
      session.isLoading = false
    })
}

export function addMessage(msg: string, type: 'success' | 'danger' | 'warning' | 'info') {
  console.log({ msg, type })
  session.messages.push({ msg, type })
}

export function deleteMessage(index: number) {
  session.messages.splice(index, 1)
}