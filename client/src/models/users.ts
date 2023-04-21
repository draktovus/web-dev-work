import { api } from '@/models/session'
import type { DataEnvelope, DataListEnvelope } from './customFetch'

/**
 * {
        "key": 1,
        "id": 1,
        "name": "manuelnreyes",
        "firstName": "Manuel",
        "lastName": "Reyes",
        "password": "wasd123",
        "handle": "@TheManuelReyes",
        "isAdmin": true,
        "emails": ["manuel@google.com"],
        "photo":
            "https://media.comicbook.com/2019/05/gintama-gintoki-1172688.jpeg?auto=webp&width=1200&height=628&crop=1200:628,smart",
        "token": "nothing"
    }
 */
export interface User {
  id: number
  name: string
  firstName: string
  lastName: string
  password: string
  handle: string
  isAdmin: boolean
  emails: Array<string>
  photo: string
  token: string
}

export function getUsers(): Promise<DataListEnvelope<User>> {
  return api('users')
}

export function getUser(id: number): Promise<DataEnvelope<User>> {
  return api(`users/${id}`)
}

export function updateUser(user: User) {
  return api('users/update', user, 'PATCH')
}
