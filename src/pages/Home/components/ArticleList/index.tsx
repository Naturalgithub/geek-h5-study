import { getArticleList } from "@/store/actions/home";
import { RootState } from "@/types/store";
import { InfiniteScroll } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import ArticleItem from "../ArticleItem";

import styles from "./index.module.scss";

type Props = {
  channelId: number;
};

const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch();

  // 获取redux中的文章
  const {
    home: { articles },
  } = useSelector((state: RootState) => state);

  const { results = [], timestamp } = articles[channelId] || {};

  const hasMore = timestamp !== null && results.length <= 100;

  // 进来会先执行一次 必须返回一个Promise对象
  const loadMore = async () => {
    await dispatch(getArticleList(channelId, timestamp || Date.now()));
  };

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      {results.map((item) => {
        return (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item} />
          </div>
        );
      })}

      {/* 无限加载组件 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default ArticleList;
