// 存放各种通用的数据
export type LoginForm = { mobile: string; code: string }

// 统一的axios的响应类型
export type ApiResponse<T> = {
  message: string
  data:T
}

export type Token = {
  token: string
  refresh_Token:string
}

