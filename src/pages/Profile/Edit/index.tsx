import { getUserProfile } from "@/store/actions/profile";
import { RootState } from "@/types/store";
import { List, NavBar } from "antd-mobile";
import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";

export default function Edit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const Item = List.Item;
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar onBack={() => history.go(-1)}>个人信息</NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={userProfile.photo} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={userProfile.name}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span
                  className={classNames("intro", userProfile.intro && "normal")}
                >
                  {userProfile.intro || "未填写"}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={userProfile.gender === 0 ? "男" : "女"}>
              性别
            </Item>
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>
        </div>
      </div>
    </div>
  );
}
