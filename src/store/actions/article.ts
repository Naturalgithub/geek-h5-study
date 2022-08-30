import request from '@/utils/request';
import { ApiResponse, ArticleDetail, CommentRes } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

/**
 * @description: 获取文章详情
 * @param {string} id
 * @return {*}
 */
export function getArticleInfo(id: string): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<ArticleDetail>>(`/articles/${id}`)
    dispatch({
      type: 'article/setArticleInfo',
      payload: res.data.data
    })
  }
}


/**
 * @description: 获取文章评论
 * @param {string} 文章id 
 * @return {*}
 */
export function getCommentList(id: string): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<CommentRes>>('/comments', {
      params: {
        type: 'a',
        source: id
      }
    })

    // console.log('文章', res)
    dispatch({
      type: 'article/saveComment',
      payload: res.data.data
    })
  }
}