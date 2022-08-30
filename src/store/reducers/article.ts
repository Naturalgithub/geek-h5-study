import { ArticleDetail } from '@/types/data';
import { ArticleAction } from '@/types/store';
import { produce } from 'immer';
import { CommentRes } from './../../types/data.d';

type ArticleType = {
  info: ArticleDetail
  comment: CommentRes
}
const initialState: ArticleType = {
  info: {},
  comment: {}
} as ArticleType

const article = produce((draft, action: ArticleAction) => {
  switch (action.type) {
    // 设置文章信息
    case 'article/setArticleInfo':
      draft.info = action.payload
      break;

    case 'article/saveComment':
      const oldResults = draft.comment.results || []
      action.payload.results = [...oldResults, ...action.payload.results]
      draft.comment = action.payload
      break

    default:
      break;
  }
}, initialState)

export default article