import type { DataEnvelope, DataListEnvelope } from './customFetch'
import { api } from './session'

/**
 * {
    "key": 1,
    "userId": 1,
    "height": 160,
    "heightUnit": "metric",
    "weight": 70,
    "weightUnit": "kg",
    "gender": "male",
    "dateOfBirth": "2001-03-30"
  }
 */
export interface Biometric {
  _id:string
  userId: number
  height: number
  heightUnit: string
  weight: number
  weightUnit: string
  gender: string
  dateOfBirth: string
}

export function getBiometricById(id: number): Promise<DataEnvelope<Biometric>> {
  return api('biometrics/' + id)
}
