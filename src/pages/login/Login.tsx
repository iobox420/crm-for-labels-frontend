import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd'

const { Title } = Typography
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/redux/authSlice'

const Login: React.FC = () => {
  const navigate = useNavigate()
  // @ts-ignore
  const auth = useSelector(state => {
    // @ts-ignore
    return state.auth
  })
  useEffect(() => {
    if (auth.isAuth) {
      if (auth.user.role === 'artist') {
        navigate('/panel', { replace: true })
      } else if (auth.user.role === 'admin') {
        navigate('/admin-panel', { replace: true })
      }
    }
  }, [auth, navigate])
  const dispatch = useDispatch()
  const onFinish = (values: { username: string; password: string }) => {
    console.log('Received values of form: ', values)
    dispatch<any>(
      login({
        email: values.username,
        password: values.password,
      }),
    )
  }

  return (
    <div className={'login-page'}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className={'dflex fdcolumn aicenter jccenter'}>
          <Title>DMG</Title>
          <Title level={5}>Divine music group</Title>
          <br />
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={'/signup'}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
