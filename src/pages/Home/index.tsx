import Icon from "@/components/Icon";
import { getAllChannel, getUserChannel } from "@/store/actions/home";
import { useInitialState } from "@/utils/hooks";
import { Popup } from "antd-mobile";
import Tabs from "antd-mobile/es/components/tabs";
import { useState } from "react";
import Channels from "./components/Channels";

import styles from "./index.module.scss";

const Home = () => {
  const { userChannels } = useInitialState(getUserChannel, "home");
  useInitialState(getAllChannel, "home");
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs className="tabs">
        {userChannels.map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            {item.name}的内容
          </Tabs.Tab>
        ))}
      </Tabs>
      {/* 搜索按钮*/}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={show} />
      </div>
      {/* // 渲染频道弹层 */}
      <Popup position="left" visible={visible}>
        <Channels hide={hide}></Channels>
      </Popup>
    </div>
  );
};

export default Home;
