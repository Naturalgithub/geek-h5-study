import { InfiniteScroll, NavBar } from "antd-mobile";
import classNames from "classnames";
import { useHistory, useParams } from "react-router-dom";
import styles from "./index.module.scss";

import Icon from "@/components/Icon";
import { getArticleInfo } from "@/store/actions/article";
import { RootState } from "@/types/store";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentFooter from "./components/CommentFooter";
import CommentItem from "./components/CommentItem";

const Article = () => {
  const history = useHistory();
  const Params = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // 获取动态路由参数
  const articleId = Params.id;

  useEffect(() => {
    dispatch(getArticleInfo(articleId));
  }, [dispatch, articleId]);

  const { info } = useSelector((state: RootState) => state.article);

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{info.title}</h1>

            <div className="info">
              <span>{dayjs(info.pubdate).format("YYYY-MM-DD")}</span>
              <span>{info.read_count} 阅读</span>
              <span>{info.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={info.aut_photo} alt="" />
              <span className="name">{info.aut_name}</span>
              <span
                className={classNames(
                  "follow",
                  info.is_followed ? "followed" : ""
                )}
              >
                {true ? "已关注" : "关注"}
              </span>
            </div>
          </div>
          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{ __html: info.content }}
            />
            <div className="date">
              发布文章时间：{dayjs(info.pubdate).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（{info.comm_count}）</span>
            <span>{info.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll
              hasMore={false}
              loadMore={async () => {
                console.log(1);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames("follow", true ? "followed" : "")}>
                {true ? "已关注" : "关注"}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  );
};

export default Article;
