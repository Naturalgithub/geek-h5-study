import request from '@/utils/request';
import { ApiResponse, Article } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';


export function getArticleList(channel_id: number, timestamp: string): RootThunkAction {
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