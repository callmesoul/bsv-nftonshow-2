import axios from 'axios'
import { ElMessage } from 'element-plus'
export default class HttpRequest {
  request
  constructor(baseUrl: string, header?: any) {
    this.request = axios.create({
      baseURL: baseUrl,
    })
    this.request.interceptors.request.use(
      async config => {
        if (header) {
          for (let i in header) {
            if (typeof header[i] === 'function') {
              config.headers[i] = header[i]()
            } else {
              config.headers[i] = header[i]
            }
          }
        }

        return config
      },
      function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )
    // 添加响应拦截器
    this.request.interceptors.response.use(
      function(response) {
        // 对响应数据做点什么
        return response.data
      },
      function(error) {
        // const status = error.response.status
        let message
        if (error.response.data.error_description) {
          message = error.response.data.error_description
        } else if (error.response.data.message && error.response.data.message !== '') {
          message = error.response.data.message
        } else if (error.response.data.error && error.response.data.error !== '') {
          message = error.response.data.error
        } else if (error.response.data) {
          message = error.response.data
          return Promise.reject(message.data)
        }
        if (message) {
          ElMessage.error(message)
        }

        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }
}
