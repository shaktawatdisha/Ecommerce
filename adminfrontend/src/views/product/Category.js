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
  CFormSelect,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategoryAction, deleteCategoryAction, addCategoryAction } from '../../redux/actions/categoryActions'

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // subcategory: 0,
  })
  const [visible, setVisible] = useState(false)
  const [subcategoryOptions, setSubcategoryOptions] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.listCategory)
  const { loading: listLoading, error: listError, category: category } = categoryList
  console.log("category",category)

  const categoryDelete = useSelector((state) => state.listCategory)
  const { loading: deleteLoading, error: deleteError, category: deleteSuccess } = categoryDelete

  useEffect(() => {
    dispatch(listCategoryAction())
  }, [])

  useEffect(() => {
    // Populate subcategory options when category data changes
    if (category) {
      const options = category.map((cat) => ({ label: cat.name, value: cat.id }))
      setSubcategoryOptions([{ label: 'Select', value: '' }, ...options])
    }
  }, [category])

  const handleInputChange = (e) => {
    console.log("e",e)
    const {name, value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = () => {
    const updatedFormData = {
      ...formData,
      subcategory: formData.subcategory ? parseInt(formData.subcategory, 10) : null,
    }
    dispatch(addCategoryAction(updatedFormData))
    setVisible(!visible)
  }

  const columns = [
    {
      key: 'id',
      label: 'Id',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'Name',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      label: 'Description',
      _props: { scope: 'col' },
    },
    // {
    //   key: 'subcategory',
    //   label: 'Sub Category',
    //   _props: { scope: 'col' },
    // },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const items = category?.map((cat) => ({
    ...cat,
    subcategory: cat.subcategory?.name || '-',
    action: (
      <>
        <CButton
          color="primary"
          size="sm"
          style={{ marginRight: '8px' }}
          onClick={() => handleView(cat.id)}
        >
          View
        </CButton>
        <CButton color="primary" size="sm" onClick={() => handleDelete(cat.id)}>
          Delete
        </CButton>
      </>
    ),
  }))

  const handleDelete = (catId) => {
    if (catId) {
      dispatch(deleteCategoryAction(catId))
    }
  }

  const handleView = (catId) => {
    navigate(`/category-detail/${catId}`)
  }
  return (
    <>
      {/* {listLoading && <p>Loading categories...</p>}
      {listError && <p>Error loading categories: {listError}</p>} */}
      <CButton
        className="mb-2"
        style={{ marginLeft: 'auto', display: 'block' }}
        color="success"
        size="sm"
        onClick={() => setVisible(!visible)}
      >
        Add Category
      </CButton>
      <CTable columns={columns} items={items} />
      {/* {deleteLoading && <p>Deleting category...</p>}
      {deleteError && <p>Error deleting category: {deleteError}</p>} */}

      {/* Modal */}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Add Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="name"
              name="name"
              label="Name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-2"
              // aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="text"
              name="description"
              id="description"
              label="Description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              // aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormSelect
              id="subcategory"
              label="SubCategory"
              name = "subcategory"
              aria-label="Default select example"
              value={formData.subcategory}
              onChange={handleInputChange}
              options={subcategoryOptions} 
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Category
