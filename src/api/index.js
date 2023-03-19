import { http } from '../utils/http'

export const api = {
  test: (params) => http.get(`/test`, params),
}
