import { getArticleList } from "@/store/actions/home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        <ArticleItem />
      </div>
    </div>
  );
};

export default ArticleList;
