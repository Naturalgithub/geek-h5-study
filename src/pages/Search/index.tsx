import { NavBar, SearchBar as Search } from "antd-mobile";
import classnames from "classnames";
import { useHistory } from "react-router";

import Icon from "@/components/Icon";
import { useDebounceFn } from "ahooks";
import { useState } from "react";
import styles from "./index.module.scss";

const SearchPage = () => {
  const history = useHistory();
  // 声明一个存放关键字的状态
  const [keyword, setKeyword] = useState("");

  const { run } = useDebounceFn((value) => {
    console.log("需要搜索");
    console.log(value);
  });

  const onChange = (e: string) => {
    setKeyword(e);
    run(e);
  };
  return (
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
            display: true ? "none" : "block",
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
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames("search-result", true ? "show" : "")}>
        <div className="result-item">
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value text-overflow">
            <span>黑马</span>
            程序员
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
