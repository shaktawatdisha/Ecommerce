

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailUserAction } from '../../redux/actions/userActions'
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

const User = () => {
  const {userid: userId} = useParams()
  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.userDetail);
  const { loading: userLoading, error: userError, user } = userDetail;

  // const userOrders = useSelector((state) => state.userOrders);
  // const { loading: ordersLoading, error: ordersError, orders } = userOrders;

  useEffect(() => {
    if (userId) {
      dispatch(detailUserAction(userId));
      // dispatch(listUserOrders(userId));
    }
  }, [dispatch, userId])


  // if (userLoading || ordersLoading) return <p>Loading...</p>;
  // if (userError) return <p>Error: {userError}</p>;
  // if (ordersError) return <p>Error: {ordersError}</p>;

  return (
    <CRow>
      <CCol sm={6}>
        <CCard>
          <CCardBody>
            <CCardTitle>User Detail</CCardTitle>
            <CCardText>
              <CListGroup>
                <CListGroupItem>
                  <strong>User ID:</strong> {user?.id}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Email:</strong> {user?.email}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>First Name:</strong> {user?.first_name || 'N/A'}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Last Name:</strong> {user?.last_name || 'N/A'}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Last Login:</strong> {user?.last_login || 'Never'}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Active Status:</strong> {user?.is_active ? 'Active' : 'Inactive'}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Date Joined:</strong> {new Date(user?.date_joined).toLocaleString()}
                </CListGroupItem>
              </CListGroup>
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      {/* <CCol sm={6}>
        <CCard>
          <CCardBody>
            <CCardTitle>Orders</CCardTitle>
            <CCardText>Total orders (placeholder)</CCardText>
          </CCardBody>
        </CCard>
      </CCol> */}
    </CRow>
  )
}

export default User
