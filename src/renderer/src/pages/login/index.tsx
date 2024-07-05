import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Tooltip } from 'antd'
import electronLogo from '../../assets/electron.svg'
import { useMemoizedFn } from 'ahooks'
import './index.less'
import { translations } from '@renderer/translations'
import { getSecret, postCreateCaptcha, postLogin } from '@renderer/http/service'
import { useEffect, useState } from 'react'
import { encrypt } from '@renderer/utils'

function Login() {
  // 创建路由钩子
  const navigate = useNavigate()
  let [captchaImg, setCaptchaImg] = useState<any>({})
  const [form] = Form.useForm()
  const onFinish = useMemoizedFn(async () => {
    let formValues = await form.validateFields()
    let { account } = formValues
    let res = await getSecret({ seed: account })
    if (res.error) {
      fetchCodeID()
      return
    }
    const item = res.getItem()
    const { key } = item
    if (!key) {
      return
    }
    const { captchaID } = captchaImg
    console.log({ ...formValues, CaptchaID: captchaID }, key)
    const param = `${account}##${encrypt(JSON.stringify({ ...formValues, CaptchaID: captchaID }), key)}`
    loginSubmit(param)
  })
  const fetchCodeID = useMemoizedFn(async () => {
    let res = await postCreateCaptcha()
    if (res.error) {
      return
    }
    let item = res.getItem()
    setCaptchaImg(item)
  })
  const loginSubmit = useMemoizedFn(async (param) => {
    postLogin(param)
      .then((res) => {
        let item = res.getItem()
        normalLoginCallBack(item)
      })
      .catch(fetchCodeID)
  })
  const normalLoginCallBack = useMemoizedFn((res: any) => {
    navigate('/home')
  })
  useEffect(() => {
    fetchCodeID()
  }, [])
  return (
    <div className="login-screen">
      <div className="login-screen-card">
        <Form form={form}>
          <img alt="logo" className="logo" src={electronLogo} />
          <Form.Item name="account">
            <Input placeholder="账号" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="密码" />
          </Form.Item>
          <div className={'flex-r-c'} style={{ justifyContent: 'space-between' }}>
            <div style={{ flex: '1', width: '0' }} className="mr10">
              <Form.Item name="CaptchaValue" style={{ marginBottom: '0px' }}>
                <Input autoComplete="off" placeholder={translations.newUser_code} />
              </Form.Item>
            </div>
            <div className="captcha-input">
              {captchaImg['image'] ? (
                <img
                  src={`data:image/png;base64,${captchaImg.image}`}
                  alt=""
                  className="border-r8"
                  style={{ height: '32px', background: '#fff', display: 'block' }}
                  onClick={fetchCodeID}
                />
              ) : (
                <p className="code-txt flex-c">
                  <span>{translations.get_failed}</span>
                  <span>{translations.please_click_refresh}</span>
                </p>
              )}
            </div>
          </div>
          <div className={`forget`}>
            <Tooltip title={translations.unStandard.str195}>
              {translations.loginScreen_forget}
            </Tooltip>
          </div>
        </Form>
        <Button type="primary" block={true} onClick={onFinish}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
