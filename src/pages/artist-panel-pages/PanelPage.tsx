import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { FileTextOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '@/processes/redux/authSlice'
import { useAppDispatch } from '@/processes/redux/hooks'

const items: MenuProps['items'] = [
  {
    label: 'Art',
    key: 'SubMenu',
    icon: <UnorderedListOutlined />,
    children: [
      {
        type: 'group',
        label: 'My art',
        children: [
          {
            label: 'Tracks',
            key: 'key-tracks',
          },
          {
            label: 'Albums',
            key: 'key-albums',
          },
          {
            label: 'Releases',
            key: 'key-releases',
          },
        ],
      },
      {
        type: 'group',
        label: 'Analytics',
        children: [
          {
            label: 'Analytics',
            key: 'key-analytics',
          },
        ],
      },
    ],
  },
  {
    label: 'Docs',
    key: 'SubMenu4',
    icon: <FileTextOutlined />,
    children: [
      {
        label: 'My contract',
        key: 'key-my-contract',
      },
      {
        label: 'Acts',
        key: 'key-acts',
      },
    ],
  },
  {
    label: 'Profile',
    key: 'SubMenu3',
    icon: <UserOutlined />,
    children: [
      {
        label: 'About me',
        key: 'key-about-me',
      },
      {
        label: 'Exit',
        key: 'key-exit',
      },
    ],
  },
]
const { Header, Content } = Layout
const PanelPage = () => {
  const dispatch = useAppDispatch()


  const [current, setCurrent] = useState('mail')
  // noinspection JSUnusedLocalSymbols
  let url = useLocation().pathname
  let navigate = useNavigate()
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    switch (e.key) {
      case 'key-about-me':
        navigate('about-me')
        break
      case 'key-my-contract':
        navigate('my-contract')
        break
      case 'key-acts':
        navigate('acts')
        break
      case 'key-exit':
        dispatch(logout())
        break
      default:
    }
  }

  return (
    <Layout style={{
      height: '100vh',
    }}>
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

export default PanelPage
