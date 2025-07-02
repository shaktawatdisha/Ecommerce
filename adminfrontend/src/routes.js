import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Product
const Product = React.lazy(() => import('./views/product/Product'))
const ProductDetail = React.lazy(() => import('./views/product/ProductDetail'))

const ProductAttributes = React.lazy(() => import('./views/product/ProductAttributes'))
// const ProductDetail = React.lazy(() => import('./views/product/ProductDetail'))

const Category = React.lazy(() => import('./views/product/Category'))
const CategoryDetail = React.lazy(() => import('./views/product/categoryDetail'))

const Brand = React.lazy(() => import('./views/product/Brand'))
const BrandDetail = React.lazy(() => import('./views/product/BrandDetail'))

const Order = React.lazy(() => import('./views/product/Order'))

// User
const User = React.lazy(() => import('./views/user/User'))
const UserDetail = React.lazy(() => import('./views/user/UserDetail'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  { path: '/product', name: 'Product', element: Product },
  { path: '/product-detail/:pid', name: 'ProductDetail', element: ProductDetail },

  { path: '/product-attributes', name: 'ProductAttributes', element: ProductAttributes },

  { path: '/brand', name: 'Brand', element: Brand },
  { path: '/brand-detail/:bid', name: 'BrandDetail', element: BrandDetail },
  
  { path: '/category', name: 'Category', element: Category },
  { path: '/category-detail/:catid', name: 'CategoryDetail', element: CategoryDetail },
  { path: '/order', name: 'Order', element: Order },

  { path: '/user', name: 'User', element: User },
  { path: '/user-detail/:userid', name: 'UserDetail', element: UserDetail },

]

export default routes
