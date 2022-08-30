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
  refresh_token: string
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

// 用户的配置文件信息
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

// 频道列表单条数据
export type Channel = {
  id: number
  name: string
}


// 定义频道的数据列星
export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}

// 搜索关键词
export type Suggestion = string[]

// 文章详情
export type ArticleDetail = {
  art_id: string
  attitude: number
  aut_id: string
  aut_name: string
  aut_photo: string
  comm_count: number
  content: string
  is_collected: boolean
  is_followed: boolean
  like_count: number
  pubdate: string
  read_count: number
  title: string
}

// 评论type
export type Comment = {
  aut_id: string
  aut_name: string
  aut_photo: string
  com_id: string
  content: string
  is_followed: boolean
  is_liking: boolean
  like_count: number
  pubdate: string
  reply_count: number
}

// comment响应体
export type CommentRes = {
  end_id: string
  last_id: string
  results: Comment[]
  total_count: number
}


