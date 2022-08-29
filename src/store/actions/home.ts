import request from '@/utils/request';
import { ApiResponse, Article } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';


/**
 * @description: 获取文章列表
 * @param {number} channel_id
 * @param {number} timestamp
 * @return {*}
 */
export function getArticleList(channel_id: number, timestamp: number): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<{
      pre_timestamp: string
      results: Article[]
    }>>('articles', {
      params: {
        channel_id,
        timestamp,
      }
    })

    dispatch({
      type: 'home/getArticleList',
      payload: {
        timestamp: +res.data.data.pre_timestamp,
        channel_id,
        results: res.data.data.results
      }
    })
    console.log('获取文章', res)
  }

}


/**
 * @description: 获取最新的列表数据 不需要追加数据
 * @param {number} channel_id
 * @param {number} timestamp
 * @return {*}
 */
export function getNewList(channel_id: number, timestamp: number): RootThunkAction {
  return async dispatch => {
    const res = await request.get<ApiResponse<{
      pre_timestamp: string
      results: Article[]
    }>>('/articles', {
      params: {
        channel_id,
        timestamp
      }
    })

    dispatch({
      type: 'home/saveNewArticles',
      payload: {
        timestamp: +res.data.data.pre_timestamp,
        channel_id,
        results: res.data.data.results
      }
    })
  }
}