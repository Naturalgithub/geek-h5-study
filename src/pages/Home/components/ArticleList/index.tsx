import { getArticleList } from "@/store/actions/home";
import { RootState } from "@/types/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleItem from "../ArticleItem";

import styles from "./index.module.scss";

type Props = {
  channelId: number;
};

const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleList(channelId, Date.now + ""));
  }, [dispatch, channelId]);

  // 获取redux中的文章
  const { articles } = useSelector((state: RootState) => state.home);

  const { results = [] } = articles[channelId] || {};
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
    </div>
  );
};

export default ArticleList;
