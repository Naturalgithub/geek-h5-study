import request from '@/utils/request';
import { ApiResponse, ArticleDetail } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

/**
 * @description: 获取文章详情
 * @param {string} id
 * @return {*}
 */
export function getArticleInfo(id: string): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<ArticleDetail>>(`/articles/${id}`)
    console.log(res)
    dispatch({
      type: 'article/setArticleInfo',
      payload: res.data.data
    })
  }
}