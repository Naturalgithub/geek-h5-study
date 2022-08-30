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
 * @param {string} article_id 文章id
 * @param {string} offset last_id
 * @return {*}
 */
export function getCommentList(article_id: string, offset?: string): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<CommentRes>>('/comments', {
      params: {
        type: 'a',
        source: article_id,
        offset
      }
    })

    // console.log('文章', res)
    dispatch({
      type: 'article/saveComment',
      payload: res.data.data
    })
  }
}

/**
 * @description: 点赞文章
 * @param {string} id
 * @param {number} attitud
 * @return {*}
 */
export function likeArticle(id: string, attitud: number): RootThunkAction {
  return async dispatch => {
    if (attitud === 1) {
      // 取消点赞
      await request.delete('/article/likings/' + id)
    } else {
      // 点赞
      await request.post('/article/likings', { target: id })
    }
    // 更新
    await dispatch(getArticleInfo(id))
  }
}

export function collectArticle(id: string, is_collected: boolean): RootThunkAction {

  return async dispatch => {
    if (is_collected) {
      // 取消收藏
      await request.delete('/article/collections/' + id)
    } else {
      // 收藏
      await request.post('/article/collections', {
        target: id
      })
    }

    // 更细
    await dispatch(getArticleInfo(id))

  }
}