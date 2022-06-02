import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate, Link, Outlet } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import { useSelector } from 'react-redux'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  /*  getItem('Dashboard', 'sub3', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),*/

  getItem('About me', 'sub1', <SettingOutlined />, [
    getItem('Profile', '9'),
    getItem('Contract', '10'),
    getItem('Acts', '11'),
  ]),
]

const Panel: React.FC = () => {
  // @ts-ignore
  const isAuth = useSelector(({ auth }) => {
    return auth.isAuth
  })
  let url = useLocation().pathname
  let navigate = useNavigate()
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    switch (e.key) {
      case '9':
        navigate('profile')
        break
      case '10':
        navigate('contract')
        break
      case '11':
        navigate('acts')
        break
      default:
        console.log('default')
    }
  }

  if (!isAuth) {
    navigate('login')
  }
  return (
    <div className={'panel-page'}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <Outlet />
    </div>
  )
}

export default Panel
