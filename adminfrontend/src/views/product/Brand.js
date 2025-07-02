import React, { useEffect, useState } from 'react'
import {
  CTable,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  listBrandAction,
  deleteBrandAction,
  addBrandAction,
} from '../../redux/actions/brandActions'

const Brand = () => {
  const [formData, setFormData] = useState({ name: '' })
  const [visible, setVisible] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const brandList = useSelector((state) => state.listBrand)
  const { loading: listLoading, error: listError, brand } = brandList

  const brandDelete = useSelector((state) => state.deleteBrand)
  const { loading: deleteLoading, error: deleteError, brand: deleteSuccess } = brandDelete

  useEffect(() => {
    dispatch(listBrandAction())
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = () => {
    if (formData.name.trim()) {
      dispatch(addBrandAction(formData)).then(() => {
        dispatch(listBrandAction()) // refresh list
        setVisible(false)
        setFormData({ name: '' }) // reset form
      })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      dispatch(deleteBrandAction(id)).then(() => {
        dispatch(listBrandAction()) // refresh list after delete
      })
    }
  }

  const handleView = (id) => {
    navigate(`/brand-detail/${id}`)
  }

  const columns = [
    { key: 'id', label: 'Id', _props: { scope: 'col' } },
    { key: 'name', label: 'Name', _props: { scope: 'col' } },
    { key: 'action', label: 'Action', _props: { scope: 'col' } },
  ]

  const items = brand?.map((bnd) => ({
    ...bnd,
    action: (
      <>
        <CButton
          color="primary"
          size="sm"
          className="me-2"
          onClick={() => handleView(bnd.id)}
        >
          View
        </CButton>
        <CButton color="primary" size="sm" onClick={() => handleDelete(bnd.id)}>
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
        color="primary"
        size="sm"
        onClick={() => setVisible(true)}
      >
        Add Brand
      </CButton>

      {listLoading && <p>Loading brands...</p>}
      {listError && <p style={{ color: 'red' }}>Error: {listError}</p>}

      <CTable columns={columns} items={items} />

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="AddBrandModal"
      >
        <CModalHeader>
          <CModalTitle id="AddBrandModal">Add Brand</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="name"
              name="name"
              label="Name"
              placeholder="Enter brand name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-2"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Brand
