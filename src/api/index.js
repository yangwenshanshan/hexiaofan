import { http } from '../utils/http'

export const api = {
  login: (params) => http.post(`/user/loginOrRegisterByWxMiniApp`, params, false),
  getQuotaRemaining: (params) => http.get(`/quota/remaining`, {params: params}),
  postScenesChat: (params) => http.post(`/scenes/chat`, params),
  postScenesTranslate: (params) => http.post(`/scenes/translate`, params),
  // /scenes/chat
}
