import classnames from "classnames";

import Icon from "@/components/Icon";

import { Article } from "@/types/data";
import styles from "./index.module.scss";

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type?: 0 | 1 | 3;
  article: Article;
};

const ArticleItem = ({ article }: Props) => {
  const {
    title,
    cover: { type, images },
    aut_name,
    comm_count,
  } = article;

  return (
    <div className={styles.root}>
      <div
        className={classnames(
          "article-content",
          (type === 1 || type === 3) && "t3",
          type === 0 && "none-mt"
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((image, index) => (
              <div key={index} className="article-img-wrapper">
                <img src={image} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>2 天前</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  );
};

export default ArticleItem;
