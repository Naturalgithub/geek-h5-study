import { login } from '@/store/actions/login'
import { LoginForm } from '@/types/data'
import { Button, Form, Input, List, NavBar, Toast } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './index.module.scss'
export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  // const formRef = useRef(null)
  const [form] = Form.useForm()

  const onFinish = async (values: LoginForm) => {
    try {
      await dispatch(login(values))
      Toast.show({
        content: '登陆成功',
        icon: 'success'
      })
      // 跳转到首页
      history.push('/home')
    } catch (error) {
      Toast.show({
        content: '登陆失败',
        icon: 'fail'
      })
    }
  }

  // 给发送验证码绑定点击事件
  // 在点击事件中获取到文本框的值
  // 判断文本框的值是否为空
  // 如果为空或手机号格式错误时，让文本框自动获得焦点
  // 获取验证码
  const mobileRef = useRef<InputRef>(null)

  const onGetCode = () => {
    const mobile = form.getFieldValue('mobile')
    const errors = form.getFieldError('mobile')

    if (!mobile || errors.length > 0) {
      // 让手机号自动获取焦点
      mobileRef.current!.focus()
      return
    }
    console.log('发送请求获取验证！')


  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        {/* 失去焦点的时候以及改变的时候触发校验 */}
        <Form onFinish={onFinish} validateTrigger={['onChange', 'onBlur']} form={form}>
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
            <Input placeholder="请输入用户名" autoComplete='off' ref={mobileRef}></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra" onClick={onGetCode}>发送验证码</span>}
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
            <Button color="primary" block className="login-submit" type='submit' >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}