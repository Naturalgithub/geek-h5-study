import { Button } from 'antd-mobile'

export default function Login() {
  return (
    <div>Login
      <Button color='primary'> button</Button>
      <svg className="icon" aria-hidden="true">
        {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
        <use xlinkHref="#iconbtn_like_sel"></use>
      </svg>
    </div>
  )
}
