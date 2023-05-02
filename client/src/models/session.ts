import { reactive } from 'vue'
import type { User } from '@/models/users'
import { getUsers } from './users'
import { useRouter } from 'vue-router'
import * as customFetch from './customFetch'

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
  const router = useRouter()

  return async function (user: any) {
    const response = await api('users/login', { name: user.name, password: user.password }, 'POST');
    
    if (response === undefined){
      return
    }
    session.user = response.data.user
    session.user!.token = response.data.token

    router.push(session.redirectUrl ?? '/')
    session.redirectUrl = null
  }
}

export function useLogout() {
  const router = useRouter()
  return function () {
    console.log({ router })

    session.user = null

    router.push('/login')
  }
}
// API
export function api(url: string, data?: any, method?: string, headers?: any) {
  session.isLoading = true

  if (session.user?.token) {
    headers = {
      ...headers,
      "Authorization": `Bearer ${session.user?.token}`
    }
  }
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