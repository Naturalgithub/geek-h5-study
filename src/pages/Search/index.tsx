import { NavBar, SearchBar as Search } from "antd-mobile";
import classnames from "classnames";
import { useHistory } from "react-router";

import Icon from "@/components/Icon";
import { getSuggestion } from "@/store/actions/search";
import { RootState } from "@/types/store";
import { useDebounceFn } from "ahooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const SearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // 声明一个存放关键字的状态
  const [keyword, setKeyword] = useState("");

  // redux建议数据
  const { suggestion } = useSelector((state: RootState) => state.search);

  // 防抖
  const { run } = useDebounceFn(
    (value) => {
      (value ?? "") && dispatch(getSuggestion(value));
    },
    {
      wait: 500,
    }
  );

  const onChange = (e: string) => {
    setKeyword(e);
    run(e);
  };

  // 高亮函数
  const hightLight = (str: string): string => {
    return str?.replace(
      new RegExp(keyword, "gi"),
      (match) => `<span>${match}</span>`
    );
  };

  return (
    // TODO 历史记录 复习redux用
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <Search
          placeholder="请输入关键字搜索"
          value={keyword}
          onChange={onChange}
        />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: keyword ? "none" : "block",
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">看我表演</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames("search-result", keyword ? "show" : "")}>
        {suggestion.map((item) => {
          return (
            <div className="result-item" key={item}>
              <Icon className="icon-search" type="iconbtn_search" />
              <div
                className="result-value text-overflow"
                dangerouslySetInnerHTML={{
                  __html: hightLight(item),
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
