import Icon from "@/components/Icon";
import { getUser } from "@/store/actions/profile";
import { useInitialState } from "@/utils/hooks";
import { getToken } from "@/utils/storage";
import { Input, NavBar, Toast } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styles from "./index.module.scss";

const Chat = () => {
  const history = useHistory();
  type MessageList = {
    type: "robot" | "user";
    text: string;
  }[];

  const chatListRef = useRef<HTMLDivElement>(null);
  // 声明一个数组状态
  const [messageList, setMessageList] = useState<MessageList>([]);

  // 获取当前用户的基本信息
  const { user } = useInitialState(getUser, "profile");

  // 建立与服务器的连接
  // 1. 安装包 yarn add socket.io-client 只安装客户端要使用到的包
  // 2. 和服务器进行连接

  // const client = io('地址', {
  //   query: {
  //     token:'用户的token'
  //   },
  //   transports: ['websocket']
  // })

  // client.on('connect', () => {})  // 当和服务器建立连接成功，这个事件就会触发
  // client.on('message', () => {})  // 接收到服务器的消息，这个事件就会触发
  // client.on('disconnect', () => {})    // 和服务器断开链接，就会触发disconnect

  // // 主动给服务器发送消息
  // client.emit('message', 值)
  // // 主动关闭和服务器的链接
  // client.close()

  // 用于缓存socket.io实例
  const clientRef = useRef<Socket | null>(null);

  useEffect(() => {
    const current = chatListRef.current as HTMLDivElement;
    current.scrollTop = current?.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    // 创建客户端实例
    const socket = io("http://toutiao.itheima.net", {
      transports: ["websocket"],
      // 在查询字符串参数中传递 token
      query: {
        token: getToken().token,
      },
    });

    // 监听连接成功的事件
    socket.on("connect", () => {
      Toast.show("连接成功");
    });

    // 监听收到消息事件
    // 给机器人发消息 5.在实例的message中，将接收到的消息添加到聊天列表
    socket.on("message", (data) => {
      console.log(">>>>>收到 socket.io 消息", data);
      setMessageList((value) => [
        ...value,
        {
          type: "robot",
          text: data.msg,
        },
      ]);
    });

    // 将客户端实例缓存刀ref 引用中
    clientRef.current = socket;

    // 组件关闭销毁socket.io 的连接
    return () => {
      socket.close();
    };
  }, []);

  // 给机器人发消息
  // 1. 输入框的内容，并绑定消息输入框
  const [message, setMessage] = useState("");
  // 2. 按回车发送消息
  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      //  3. 通过socket.io客户端向服务端发送消息
      clientRef.current?.emit("message", {
        msg: message,
        timestamp: Date.now(),
      });

      // 4. 向聊天记录添加当前发送的消息
      setMessageList([
        ...messageList,
        {
          type: "user",
          text: message,
        },
      ]);

      setMessage("");
    }
  };

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
        {messageList.map((item, index) => {
          if (item.type === "robot") {
            return (
              // {/* 机器人的消息 */}
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            );
          } else {
            return (
              //  {/* 用户的消息 */}
              <div className="chat-item user" key={index}>
                <img src={user.photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
            );
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border input"
          placeholder="请描述您的问题"
          value={message}
          onChange={(e) => setMessage(e)}
          onKeyUp={onSendMessage}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
