import classnames from "classnames";

import Icon from "@/components/Icon";
import { RootState } from "@/types/store";
import { differenceBy } from "lodash";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

type Props = {
  hide: () => void;
};

// 频道推荐中展示的是除了我的频道之外的其他频道数据，由于接口并没有直接提供频道推荐数据，
// 因此，可以拿到所有频道数据，然后，排除掉我的频道数据，剩下的就是频道推荐数据了。

const Channels = ({ hide }: Props) => {
  const { userChannels, allChannels } = useSelector(
    (state: RootState) => state.home
  );
  const optionChannels = differenceBy(allChannels, userChannels, "id");

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={hide} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item")}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit">编辑</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item) => {
              return (
                <span className={classnames("channel-list-item")} key={item.id}>
                  {item.name}
                  <Icon type="iconbtn_tag_close" />
                </span>
              );
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            {/* <span className="channel-item-title-extra">点击添加频道</span> */}
          </div>

          <div className="channel-list">
            {optionChannels.map((item) => {
              return <span className="channel-list-item">+ {item.name}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
