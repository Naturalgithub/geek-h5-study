import request from '@/utils/request';
import { ApiResponse, Suggestion } from './../../types/data.d';
import { RootThunkAction } from './../../types/store.d';

/**
 * @description: 获取建议字符列表action 
 * @param {string} value
 * @return {*}
 */
export function getSuggestion(value: string): RootThunkAction {

  return async dispatch => {
    const res = await request.get<ApiResponse<{ options: Suggestion }>>('/suggestion', {
      params: {
        q: value
      }
    })

    dispatch({
      type: 'search/suggestion',
      payload: res.data.data.options
    })
  }
}