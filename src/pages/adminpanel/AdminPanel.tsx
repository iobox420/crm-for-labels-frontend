import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { FileTextOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/authSlice'

const items: MenuProps['items'] = [
  {
    label: 'Admin',
    key: 'SubMenu',
    icon: <UnorderedListOutlined />,
    children: [
      {
        type: 'group',
        label: 'Artists',
        children: [
          {
            label: 'All artists',
            key: 'key-all-artists',
          },
        ],
      },
      {
        label: 'Exit',
        key: 'key-exit',
      },
    ],
  },
]
const { Header, Footer, Content } = Layout
const AdminPanel = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const isAuth = useSelector(({ auth }) => {
    return auth.isAuth
  })
  const [current, setCurrent] = useState('mail')
  let url = useLocation().pathname
  let navigate = useNavigate()
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    console.log('click ', e)
    switch (e.key) {
      case 'key-all-artists':
        navigate('artists')
        break

      case 'key-exit':
        // @ts-ignore
        dispatch(logout())
        console.log('exit')
        break
      default:
        console.log('default')
    }
  }
  if (!isAuth) {
    navigate('../login', { replace: true })
  }
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          padding: '0 20px',
        }}
      >
        <div className="logo" />
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </Header>
      <Content
        style={{
          position: 'relative',
          top: '64px',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AdminPanel
