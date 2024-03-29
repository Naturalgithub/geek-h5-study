import Icon from "@/components/Icon";
import { collectArticle, likeArticle } from "@/store/actions/article";
import { ArticleDetail } from "@/types/data";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: "normal" | "reply";
  info: ArticleDetail;
};

const CommentFooter = ({ type = "normal", info }: Props) => {
  const dispatch = useDispatch();

  // 点赞文章
  const onLike = () => {
    dispatch(likeArticle(info.art_id, info.attitude));
  };

  // 收藏文章
  const onCollect = () => {
    dispatch(collectArticle(info.art_id, info.is_collected));
  };

  return (
    <div className={styles.root}>
      <div className="input-btn">
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === "normal" && (
        <>
          <div className="action-item">
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!info.comm_count && (
              <span className="bage">{info.comm_count}</span>
            )}
          </div>
          <div className="action-item" onClick={onLike}>
            <Icon
              type={info.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"}
            />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={onCollect}>
            <Icon
              type={
                info.is_collected ? "iconbtn_collect_sel" : "iconbtn_collect"
              }
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === "reply" && (
        <div className="action-item">
          <Icon type={info.attitude ? "iconbtn_like_sel" : "iconbtn_like2"} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  );
};

export default CommentFooter;
