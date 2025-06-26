import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCategoryAction } from '../../redux/actions/categoryActions'
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

const categoryDetail = () => {
    const {catid: catId} = useParams()
    const dispatch = useDispatch()
    const categoryDetail = useSelector((state)=> state.fetchCategory)
    const {loading, error, category} = categoryDetail

    
    useEffect(() => {
      if (catId) {
        dispatch(fetchCategoryAction(catId));
      }
    }, [dispatch, catId])


    return (
      <CRow>
        <CCol sm={6}>
          <CCard>
            <CCardBody>
              <CCardTitle>Category Detail</CCardTitle>
              <CCardText>
                <CListGroup>
                  <CListGroupItem>
                    <strong>Category ID:</strong> {category?.id}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Name:</strong> {category?.name}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Description:</strong> {category?.description || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>SubCategory:</strong> {category?.subcategory?.name || 'N/A'}
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




