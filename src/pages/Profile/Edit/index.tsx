import { getUserProfile, updateUserProfile } from "@/store/actions/profile";
import { useInitialState } from "@/utils/hooks";
import { List, NavBar, Popup, Toast } from "antd-mobile";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditInput from "./components/EditInput";
import styles from "./index.module.scss";

export default function Edit() {
  const history = useHistory();
  const dispatch = useDispatch();

  // 控制显示隐藏
  const [showInput, setShowInput] = useState<{
    visible: boolean;
    type: "" | "name" | "intro";
  }>({ visible: false, type: "" });

  const { userProfile } = useInitialState(getUserProfile, "profile");

  const Item = List.Item;

  // 关闭弹窗的方法
  const hideInput = () => {
    setShowInput({
      type: "",
      visible: false,
    });
  };

  // 修改昵称和简介
  const onUpdate = async (key: string, value: string) => {
    await dispatch(updateUserProfile(key, value));

    Toast.show({
      content: "修改成功",
      icon: "success",
    });

    // 关闭弹窗
    hideInput();
  };
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
            <Item
              arrow
              extra={userProfile.name}
              onClick={() => setShowInput({ type: "name", visible: true })}
            >
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
              onClick={() => setShowInput({ type: "intro", visible: true })}
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

        <Popup
          visible={showInput.visible}
          position="right"
          bodyStyle={{ width: "100vw" }}
          destroyOnClose
        >
          <EditInput
            type={showInput.type}
            onUpdate={onUpdate}
            hideInput={() => {
              setShowInput({ type: "", visible: false });
            }}
          ></EditInput>
        </Popup>
      </div>
    </div>
  );
}
