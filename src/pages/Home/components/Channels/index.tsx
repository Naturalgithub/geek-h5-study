import classnames from "classnames";

import Icon from "@/components/Icon";
import { addChannel, changeActive, delChannel } from "@/store/actions/channel";
import { Channel } from "@/types/data";
import { RootState } from "@/types/store";
import { differenceBy } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

type Props = {
  hide: () => void;
};

// 频道推荐中展示的是除了我的频道之外的其他频道数据，由于接口并没有直接提供频道推荐数据，
// 因此，可以拿到所有频道数据，然后，排除掉我的频道数据，剩下的就是频道推荐数据了。

const Channels = ({ hide }: Props) => {
  const dispatch = useDispatch();
  const { userChannels, allChannels } = useSelector(
    (state: RootState) => state.channel
  );
  const optionChannels = differenceBy(allChannels, userChannels, "id");

  // 高亮
  const { active } = useSelector((state: RootState) => state.channel);

  const changeHomeActive = (id: number) => {
    dispatch(changeActive(id));
  };

  /**
   * @description: 添加频道
   * @param {Channel} channel
   * @return {*}
   */
  const onAddChannel = (channel: Channel) => {
    dispatch(addChannel(channel));
  };

  // 是否编辑状态
  const [isEdit, setIsEdit] = useState(false);
  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={hide} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item", { edit: isEdit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {isEdit ? "点击删除频道" : "点击进入频道"}
            </span>
            <span
              className={classnames("channel-item-edit")}
              onClick={changeEdit}
            >
              {isEdit ? "完成" : "编辑"}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item) => {
              return (
                <span
                  className={classnames([
                    "channel-list-item",
                    active === item.id ? "selected" : null,
                  ])}
                  onClick={() => changeHomeActive(item.id)}
                  key={item.id}
                >
                  {item.name}
                  {isEdit ? (
                    <Icon
                      type="iconbtn_tag_close"
                      onClick={() => {
                        dispatch(delChannel(item));
                      }}
                    />
                  ) : (
                    ""
                  )}
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
              return (
                <span
                  className="channel-list-item"
                  key={item.id}
                  onClick={() => onAddChannel(item)}
                >
                  + {item.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
