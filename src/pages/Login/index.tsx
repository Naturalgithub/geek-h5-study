import { login } from '@/store/actions/login'
import { LoginForm } from '@/types/data'
import { Button, Form, Input, List, NavBar } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './index.module.scss'
export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()

  const onFinish = (values: LoginForm) => {
    dispatch(login(values))
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        {/* 失去焦点的时候以及改变的时候触发校验 */}
        <Form onFinish={onFinish} validateTrigger={['onChange', 'onBlur']}>
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              {
                required: true,
                message: '手机号不能为空',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入用户名" autoComplete='off'></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
                {
                  pattern: /^\d{6}$/,
                  message: '验证码格式错误',
                },
              ]}
            >
              <Input placeholder="请输入验证码" autoComplete='off'></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button color="primary" block className="login-submit" type='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}