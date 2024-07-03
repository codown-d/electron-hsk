import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import electronLogo from '../../assets/electron.svg'
import './index.less'

function Login() {
  // 创建路由钩子
  const navigate = useNavigate()

  return (
    <div className="P-login">
      <img src={electronLogo} alt="" className="logo" />
      <div className="ipt-con">
        <Input placeholder="账号" />
      </div>
      <div className="ipt-con">
        <Input.Password placeholder="密码" />
      </div>
      <div className="ipt-con">
        <Button
          type="primary"
          block={true}
          onClick={() => {
            navigate('/home')
          }}
        >
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
