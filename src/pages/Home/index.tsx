import Icon from "@/components/Icon";
import {
  changeActive,
  getAllChannel,
  getUserChannel,
} from "@/store/actions/channel";
import { RootState } from "@/types/store";
import { useInitialState } from "@/utils/hooks";
import { Popup } from "antd-mobile";
import Tabs from "antd-mobile/es/components/tabs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "./components/ArticleList";
import Channels from "./components/Channels";

import styles from "./index.module.scss";

const Home = () => {
  const { userChannels } = useInitialState(getUserChannel, "channel");
  useInitialState(getAllChannel, "channel");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { active } = useSelector((state: RootState) => state.channel);

  const hide = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  const onChange = (key: string) => {
    dispatch(changeActive(+key));
  };
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs className="tabs" activeKey={active + ""} onChange={onChange}>
        {userChannels.map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            {/* 在每个 Tabs.TabPane 中渲染文章列表组件 */}
            <ArticleList channelId={item.id} />
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
