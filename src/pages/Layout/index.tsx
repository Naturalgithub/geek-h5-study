import Icon from '@/components/Icon'
import { TabBar } from 'antd-mobile'
import { Route, useHistory, useLocation } from 'react-router-dom'
import Home from '../Home'
import Profile from '../Profile'
import Question from '../Question'
import Video from '../Video'
import styles from './index.module.scss'

const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]
export default function Layout() {
  const history = useHistory()
  const location = useLocation()
  const changeRoute = (path: string) => {
    history.push(path)
  }
  return (
    <div className={styles.root}>
      <Route exact path="/home">
        <Home></Home>
      </Route>
      <Route path="/home/question">
        <Question></Question>
      </Route>
      <Route path="/home/video">
        <Video></Video>
      </Route>
      <Route path="/home/profile">
        <Profile></Profile>
      </Route>

      <TabBar
        className="tab-bar"
        onChange={changeRoute}
        activeKey={location.pathname}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => {
              if (active) {
                // 当前tab激活
                return <Icon type={item.icon + '_sel'}></Icon>
              } else {
                // 没有激活
                return <Icon type={item.icon}></Icon>
              }
            }}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}
