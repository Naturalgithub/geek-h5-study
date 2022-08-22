// 存放各种通用的数据
export type LoginForm = { mobile: string; code: string }

// 统一的axios的响应类型
export type ApiResponse<T> = {
  message: string
  data: T
}

// token类型
export type Token = {
  token: string
  refresh_Token: string
}

// 我的 - 个人信息
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

