import { Input, NavBar, TextArea } from "antd-mobile";
import styles from "./index.module.scss";

type Props = {
  hideInput: () => void;
  type: "" | "name" | "intro";
};

export default function EditInput({ hideInput, type }: Props) {
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={<span className="commit-btn">提交</span>}
        onBack={hideInput}
      >
        编辑{type === "name" ? "昵称" : "简介"}
      </NavBar>

      <div className="edit-input-content">
        <h3>编辑{type === "name" ? "昵称" : "简介"}</h3>

        {type === "name" ? (
          <div className="input-wrap">
            <Input placeholder="请输入昵称" />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
          />
        )}
      </div>
    </div>
  );
}
