import { ArticleDetail } from '@/types/data';
import { ArticleAction } from '@/types/store';
import { produce } from 'immer';

type ArticleType = {
  info: ArticleDetail
}
const initialState: ArticleType = {
  info: {}
} as ArticleType

const article = produce((draft, action: ArticleAction) => {
  switch (action.type) {
    // 设置文章信息
    case 'article/setArticleInfo':
      draft.info = action.payload
      break;

    default:
      break;
  }
}, initialState)

export default article