import React from 'react'
import { CTable, CButton, CRow, CCol } from '@coreui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsersAction } from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList
  console.log("users", users)

  useEffect(() => {
    dispatch(listUsersAction())
  }, [dispatch])

  const columns = [
    {
      key: 'id',
      label: 'UserId',
      _props: { scope: 'col' },
    },
    {
      key: 'email',
      label: 'Email',
      _props: { scope: 'col' },
    },
    {
      key: 'first_name',
      label: 'First Name',
      _props: { scope: 'col' },
    },
    {
      key: 'last_name',
      label: 'Last Name',
      _props: { scope: 'col' },
    },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const handleView = (userId) => {
    console.log('hnadle view clicked ', userId)
    navigate(`/user-detail/${userId}`)
  }

  const items = users?.map((user) => ({
    ...user,
    action: (
      <>
      <CButton color="primary" size="sm" style={{ marginRight: '8px' }} onClick={() => handleView(user.id)}>
        View
      </CButton>
      <CButton color="primary" size="sm" onClick={() => handleDelete(user.id)}>
      Delete
    </CButton>
    </>
    ),
  }))

  return (
    <>
      <CButton
        className="mb-2"
        style={{ marginLeft: 'auto', display: 'block' }}
        color="success"
        size="sm"
      >
        Add User
      </CButton>
      <CTable columns={columns} items={items} />
    </>
  )
}

export default User
