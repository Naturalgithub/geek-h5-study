import Icon from "@/components/Icon";
import { getUserChannel } from "@/store/actions/home";
import { useInitialState } from "@/utils/hooks";
import Tabs from "antd-mobile/es/components/tabs";

import styles from "./index.module.scss";

const Home = () => {
  const { userChannels } = useInitialState(getUserChannel, "home");

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
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  );
};

export default Home;
