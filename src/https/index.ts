/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
  type InternalAxiosRequestConfig,
} from 'axios'
import { message } from 'ant-design-vue';
import { getToken, removeToken } from '@/utils/auth' // 假设存在token操作工具
import router from '@/router'

// 定义响应数据结构
interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// 错误类型枚举
enum ErrorType {
  NETWORK_ERROR = '网络错误',
  TIMEOUT_ERROR = '请求超时',
  ABORT_ERROR = '请求被取消',
  SERVER_ERROR = '服务器错误',
  UNKNOWN_ERROR = '未知错误'
}

// 加载实例

// 存储请求取消令牌
const cancelTokenSources = new Map<string, CancelTokenSource>()

/**
 * 生成请求唯一标识
 * @param config 请求配置
 * @returns 唯一标识字符串
 */
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { method, url, params, data } = config
  return [
    method?.toUpperCase(),
    url,
    JSON.stringify(params),
    JSON.stringify(data)
  ].join('&')
}

/**
 * 创建Axios实例
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量获取基础地址
  timeout: 10000, // 超时时间10秒
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

/**
 * 请求拦截器
 *  在请求发送前处理请求配置
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 生成请求唯一标识
    const requestKey = generateRequestKey(config)

    // 取消重复请求
    if (cancelTokenSources.has(requestKey)) {
      const source = cancelTokenSources.get(requestKey)
      source?.cancel(`取消重复请求: ${config.url}`)
      cancelTokenSources.delete(requestKey)
    }

    // 创建取消令牌
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    cancelTokenSources.set(requestKey, source)

    // 添加加载动画


    // 添加token
    const token = getToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error:any) => {
    // 处理请求错误
    handleError(error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 移除取消令牌
    const requestKey = generateRequestKey(response.config)
    cancelTokenSources.delete(requestKey)

    // 关闭加载动画

    const { code, message:msg, data } = response.data

    // 处理业务错误
    if (code !== 200) {
      // 401: 未授权，需要重新登录
      if (code === 401) {
        message.error('登录已过期，请重新登录')
        removeToken()
        router.push('/login')
      } else {
        message.error(msg || '操作失败')
      }
      return Promise.reject(new Error(msg || 'Error'))
    }

    return data
  },
  (error) => {
    // 移除取消令牌
    if (error.config) {
      const requestKey = generateRequestKey(error.config)
      cancelTokenSources.delete(requestKey)
    }

    // 关闭加载动画


    // 处理响应错误
    handleError(error)
    return Promise.reject(error)
  }
)

/**
 * 错误处理函数
 * @param error 错误对象
 */
const handleError = (error: any) => {
  let errorMessage = ErrorType.UNKNOWN_ERROR

  if (axios.isCancel(error)) {
    errorMessage = `${ErrorType.ABORT_ERROR}: ${error.message}`
  } else if (error.code === 'ECONNABORTED') {
    errorMessage = ErrorType.TIMEOUT_ERROR
  } else if (!window.navigator.onLine) {
    errorMessage = ErrorType.NETWORK_ERROR
  } else if (error.response) {
    // 服务器返回错误
    const status = error.response.status
    errorMessage = `${ErrorType.SERVER_ERROR} (${status})`
  }

  // 只显示非取消类型的错误
  if (!axios.isCancel(error)) {
    message.error(errorMessage)
  }

  console.error('请求错误:', error)
}

/**
 * 封装请求方法
 */
const https = {
  /**
   * GET请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 额外配置
   * @returns 响应数据
   */
  get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.get(url, { params, ...config })
  },

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 额外配置
   * @returns 响应数据
   */
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config)
  },

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 额外配置
   * @returns 响应数据
   */
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config)
  },

  /**
   * DELETE请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 额外配置
   * @returns 响应数据
   */
  delete<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.delete(url, { params, ...config })
  },

  /**
   * 取消所有请求
   */
  cancelAllRequests(): void {
    cancelTokenSources.forEach((source) => {
      source.cancel('取消所有请求')
    })
    cancelTokenSources.clear()
  }
}

export default https
