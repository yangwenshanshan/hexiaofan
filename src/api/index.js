import { http } from '../utils/http'

export const api = {
  login: (params) => http.post(`/user/loginOrRegisterByWxMiniApp`, params, false),
  getQuotaRemaining: (params) => http.get(`/quota/remaining`, params),
  postScenesChat: (params) => http.post(`/scenes/chat`, params),
  postScenesTranslate: (params) => http.post(`/scenes/translate`, params),
  postLeaveMessage: (params) => http.post(`/messages`, params),
  postQuotaAddUsage: (params) => http.post(`/quota/addUsage`, params),
  getUserInfo: (params) => http.post(`/wx/info`, params),
  updatePhoneByWxMiniApp: (params) => http.post(`/user/updatePhoneByWxMiniApp`, params),
}
