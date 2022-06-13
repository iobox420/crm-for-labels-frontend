import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { UnorderedListOutlined} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
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
          {
            label: 'All users',
            key: 'key-all-users',
          },
          {
            label: 'All artists rtk-query',
            key: 'key-all-artists-rtk-query',
          },
/*          {
            label: 'test',
            key: 'key-test',
          },
          {
            label: 'test2',
            key: 'key-test2',
          },*/
        ],
      },
      {
        label: 'Exit',
        key: 'key-exit',
      },
    ],
  },
]
const { Header,  Content } = Layout
const AdminPanel = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const isAuth = useSelector(({ auth }) => {
    return auth.isAuth
  })
  const [current, setCurrent] = useState('mail')
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    console.log('click ', e)
    switch (e.key) {
      case 'key-all-artists':
        navigate('artists')
        break
      case 'key-all-artists-rtk-query':
        navigate('artists-rtk')
        break
      case 'key-all-users':
        navigate('users')
        break
/*      case 'key-test':
        navigate('test')
        break
      case 'key-test2':
        navigate('test2')
        break*/
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
