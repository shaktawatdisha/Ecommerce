import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductAction } from '../../redux/actions/productActions'
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
import Product from './Product'

const categoryDetail = () => {
    const {pid: prodId} = useParams()
    const dispatch = useDispatch()
    const productDetail = useSelector((state)=> state.fetchProduct)
    const {loading, error, product} = productDetail

    
    useEffect(() => {
      if (prodId) {
        dispatch(fetchProductAction(prodId));
      }
    }, [dispatch, prodId])


    return (
      <CRow>
        <CCol sm={6}>
          <CCard>
            <CCardBody>
              <CCardTitle>Product Detail</CCardTitle>
              <CCardText>
                <CListGroup>
                  <CListGroupItem>
                    <strong>Product ID:</strong> {product?.id}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Name:</strong> {product?.name || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Description:</strong> {product?.description || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Brand:</strong> {product?.brand || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Price:</strong> {product?.price || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Stock Quantity:</strong> {product?.stock_quantity || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Status:</strong> {product?.status || 'N/A'}
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

export default categoryDetail




