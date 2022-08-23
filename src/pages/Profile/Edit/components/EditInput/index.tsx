import { RootState } from "@/types/store";
import { Input, NavBar, TextArea } from "antd-mobile";
import { InputRef } from "antd-mobile/es/components/input";
import { TextAreaRef } from "antd-mobile/es/components/text-area";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

type Props = {
  hideInput: () => void;
  type: "" | "name" | "intro";
  onUpdate: (key: string, value: string) => void;
};

export default function EditInput({ hideInput, type, onUpdate }: Props) {
  const { userProfile } = useSelector((state: RootState) => state.profile);

  const [value, setValue] = useState(
    type === "name" ? userProfile.name : userProfile.intro
  );

  // 修改昵称和简介自动获取光标
  const inputRef = useRef<InputRef>(null);
  const textareaRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    if (type === "name") {
      inputRef.current?.focus();
    } else {
      textareaRef.current?.focus();
      document.querySelector("textarea")?.setSelectionRange(-1, -1);
    }
  }, [type]);

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={() => onUpdate(type, value)}>
            提交
          </span>
        }
        onBack={hideInput}
      >
        编辑{type === "name" ? "昵称" : "简介"}
      </NavBar>

      <div className="edit-input-content">
        <h3>编辑{type === "name" ? "昵称" : "简介"}</h3>

        {type === "name" ? (
          <div className="input-wrap">
            <Input
              ref={inputRef}
              placeholder="请输入昵称"
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入简介"
            ref={textareaRef}
            showCount
            maxLength={99}
            value={value}
            onChange={(e) => setValue(e)}
          />
        )}
      </div>
    </div>
  );
}
