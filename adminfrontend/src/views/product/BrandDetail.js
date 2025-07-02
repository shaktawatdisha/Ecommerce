import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBrandAction } from '../../redux/actions/brandActions'
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

const BrandDetail = () => {
  const { bid: brandId } = useParams()
  const dispatch = useDispatch()
  const brandDetail = useSelector((state) => state.fetchBrand)
  const { loading, error, brand } = brandDetail

  useEffect(() => {
    if (brandId) {
      dispatch(fetchBrandAction(brandId))
    }
  }, [dispatch, brandId])

  return (
    <CRow>
      <CCol sm={6}>
        <CCard>
          <CCardBody>
            <CCardTitle>Brand Detail</CCardTitle>
            <CCardText>
              <CListGroup>
                <CListGroupItem>
                  <strong>Brand ID:</strong> {brand?.id}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Name:</strong> {brand?.name}
                </CListGroupItem>
              </CListGroup>
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BrandDetail
