import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile,
} from "@/store/actions/profile";
import { useInitialState } from "@/utils/hooks";
import { List, NavBar, Popup, Toast } from "antd-mobile";
import classNames from "classnames";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditInput from "./components/EditInput";
import EditList from "./components/EditList";
import styles from "./index.module.scss";

export default function Edit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

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

  // 更新补丁数据
  const onUpdate = async (key: string, value: string) => {
    if (key === "photo") {
      console.log("需要修改头像");
      fileRef.current?.click();
      return;
    }

    await dispatch(updateUserProfile(key, value));

    Toast.show({
      content: "修改成功",
      icon: "success",
    });

    // 关闭弹窗
    hideInput();
    hideList();
  };

  type ListSate = {
    visible: boolean;
    type: "" | "gender" | "photo";
  };

  const [showList, setShowList] = useState<ListSate>({
    visible: false,
    type: "",
  });

  // 关闭头像和性别弹窗
  const hideList = () => {
    setShowList({
      type: "",
      visible: false,
    });
  };

  // 更改头像
  const onChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 获取选择文件
    const file = e.target.files![0];
    // 需要上传的文件
    const fd = new FormData();
    fd.append("photo", file);
    // 发送请求
    await dispatch(updateUserPhoto(fd));
    // 修改成功弹窗
    Toast.show({
      icon: "success",
      content: "修改头像成功",
    });
    // 关闭碳层
    hideList();
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
              onClick={() => setShowList({ type: "photo", visible: true })}
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
            <Item
              arrow
              extra={userProfile.gender === 0 ? "男" : "女"}
              onClick={() => setShowList({ type: "gender", visible: true })}
            >
              性别
            </Item>
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>
        </div>

        {/* 昵称和简介弹层 */}
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

        {/* 性别和头像碳层 */}
        <Popup visible={showList.visible} destroyOnClose onMaskClick={hideList}>
          <EditList
            hideList={hideList}
            type={showList.type}
            onUpdate={onUpdate}
          ></EditList>

          <input type="file" hidden ref={fileRef} onChange={onChangePhoto} />
        </Popup>
      </div>
    </div>
  );
}
