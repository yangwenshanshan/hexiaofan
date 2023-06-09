const HOST = 'https://greatchat.lanhejiaoyu.net'

uni.addInterceptor('request', {
  // invoke(args) {
  // },
  returnValue(args) {
    return new Promise((resolve, reject) => {
      args.then(res => {
        if (res.data && res.data.code !== 'SUCCESS') {
          if (res.data.code === 'AUTH_ERROR') {
            uni.showModal({
							title: '提示',
							content: '登录超时，重新登录',
							showCancel: false,
              success: () => {
                uni.reLaunch({
                  url: '/pages/home/home?needAuth=1'
                })
              }
						})
          } else {
            uni.showToast({
              title: res.data.code,
              icon: 'none',
            })
          }
        }
        resolve(res.data)
      })
    })
  }
})

const payload = (url, params, access) => {
  let host = ''
  if (!url.startsWith('http')) {
    host = HOST
  }

  let payload = {
    url: host + url,
    data: params,
    dataType: 'json',
    header: {}
  }

  // 是否需要登录权限
  if (access) {
    try {
      let token = uni.getStorageSync('token')

      if (token) {
        payload.header['Authorization'] = 'Bearer ' + token
      }
    } catch (error) {
    }
  }
  return payload
}

/**
 * 网络请求
 *
 * @param {any} url
 * @param {any} [params={}]
 * @param {boolean} [access=true]
 * @returns
 */

let httpMethodsType = [{
  type: 'get',
  method: 'GET'
}, {
  type: 'post',
  method: 'POST'
}, {
  type: 'put',
  method: 'PUT'
}, {
  type: 'delete',
  method: 'DELETE'
}]

let http = {}

httpMethodsType.forEach((res) => {
  http[res.type] = (url, params = {}, access = true) => {
    return uni.request({method: res.method, ...payload(url, params, access)})
  }
})

// /**
//  * 文件上传
//  *
//  * @param {any} url
//  * @param {any} [params={}]
//  * @returns
//  */
// const wxUpload = (url, params = {}) => {
//   let host = ''
//   if (url.startsWith('http')) {
//     host = url
//   } else {
//     host = HOST + url
//   }
//   let payload = {
//     url: host,
//     name: params.name,
//     filePath: params.filePath,
//     formData: params.formData,
//     header: {
//       'X-Access-Token': wx.getStorageSync('token'),
//       'X-File-Name': params.name
//     },
//     success: (res) => {
//       params.success(JSON.parse(res.data))
//     }
//   }
//   return wx.uploadFile(payload)
// }

module.exports = {
  http,
  // wxUpload
}
