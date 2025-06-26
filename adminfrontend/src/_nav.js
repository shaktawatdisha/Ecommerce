import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'User',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/user',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Product',
  },
  {
    component: CNavItem,
    name: 'Category',
    to: '/category',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Product',
    to: '/product',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Order',
    to: '/order',
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    badge: {
      color: 'info',
    },
  },
  
]

export default _nav
