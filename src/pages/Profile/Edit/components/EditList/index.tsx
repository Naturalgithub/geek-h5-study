import styles from "./index.module.scss";
type Props = {
  type: "" | "gender" | "photo";
  onUpdate: (key: string, value: string) => void;
  hideList: () => void;
};

const genderList = [
  { title: "男", value: "0" },
  { title: "女", value: "1" },
];

const photoList = [
  { title: "拍照", value: "0" },
  { title: "本地选择", value: "1" },
];

const EditList = ({ hideList, type, onUpdate }: Props) => {
  return (
    <div className={styles.root}>
      {(type === "gender" ? genderList : photoList).map((item) => {
        return (
          <div
            className="list-item"
            key={item.value}
            onClick={() => onUpdate(type, item.value)}
          >
            {item.title}
          </div>
        );
      })}

      <div className="list-item" onClick={hideList}>
        取消
      </div>
    </div>
  );
};

export default EditList;
