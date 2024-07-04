import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import electronLogo from '../../assets/electron.svg'
import { useMemoizedFn } from 'ahooks'
import './index.less'

function Login() {
  // 创建路由钩子
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = useMemoizedFn(() => {
    navigate('/home')
  })
  return (
    <div className="login-screen">
      <div className="login-screen-card">
        <Form form={form}>
          <img alt="logo" className="logo" src={electronLogo} />
          <Form.Item name="note">
            <Input placeholder="账号" />
          </Form.Item>
          <Form.Item name="note">
            <Input.Password placeholder="密码" />
          </Form.Item>
        </Form>
        <Button type="primary" block={true} onClick={onFinish}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
