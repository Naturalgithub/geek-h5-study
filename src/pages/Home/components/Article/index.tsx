import { InfiniteScroll, NavBar } from "antd-mobile";
import classNames from "classnames";
import { useHistory, useParams } from "react-router-dom";
import styles from "./index.module.scss";

import Icon from "@/components/Icon";
import { getArticleInfo } from "@/store/actions/article";
import { RootState } from "@/types/store";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    // 配置 highlight.js
    hljs.configure({
      // 忽略未经转义的 HTML 字符
      ignoreUnescapedHTML: true,
    });
    // 获取到内容中所有的code标签
    const codes = document.querySelectorAll(".dg-html pre ");
    codes.forEach((el) => {
      // 让code进行高亮
      hljs.highlightElement(el as HTMLElement);
    });
  }, [info]);

  // 导航栏的显示与隐藏
  // 为顶部导航栏添加作者信息
  // 是否显示顶部信息
  const [isShowAuthor, setIsShowAuthor] = useState(false);
  const authorRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 控制显示隐藏逻辑
  useEffect(() => {
    const warpDOM = wrapRef.current!;
    const authDOM = authorRef.current!;

    // getBoundingClientRect 返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合。
    // https://juejin.cn/post/6844903888902963213
    const onScroll = function () {
      const rect = authDOM.getBoundingClientRect()!;

      if (rect.top <= 0) {
        setIsShowAuthor(true);
      } else {
        setIsShowAuthor(false);
      }
    };
    warpDOM.addEventListener("scroll", onScroll);
    return () => {
      warpDOM.removeEventListener("scroll", onScroll);
    };
  }, []);

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{info.title}</h1>

            <div className="info">
              <span>{dayjs(info.pubdate).format("YYYY-MM-DD")}</span>
              <span>{info.read_count} 阅读</span>
              <span>{info.comm_count} 评论</span>
            </div>

            <div className="author" ref={authorRef}>
              <img src={info.aut_photo} alt="" />
              <span className="name">{info.aut_name}</span>
              <span
                className={classNames(
                  "follow",
                  info.is_followed ? "followed" : ""
                )}
              >
                {info.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          </div>
          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(info.content || ""),
              }}
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
          {isShowAuthor && (
            <div className="nav-author">
              <img src={info.aut_photo} alt="" />
              <span className="name">{info.is_followed}</span>
              <span
                className={classNames(
                  "follow",
                  info.is_followed ? "followed" : ""
                )}
              >
                {info.is_followed ? "已关注" : "关注"}
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
