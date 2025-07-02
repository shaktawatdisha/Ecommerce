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
import { listProductAttributesAction, addProductAttributesAction, deleteProductAttributesAction } from '../../redux/actions/productAttributesActions'

const ProductAttributes = () => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
  })
  const [visible, setVisible] = useState(false)
  const [productAttributesOptions, setproductAttributesOptions] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productAttributesList = useSelector((state) => state.listProductAttributes)
  const { loading: listLoading, error: listError, productAttributes: productAttributes } = productAttributesList

  // const productDelete = useSelector((state) => state.listProduct)
  // const { loading: deleteLoading, error: deleteError, product: deleteSuccess } = productDelete



  useEffect(() => {
    dispatch(listProductAttributesAction())
    
  }, [dispatch])

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = () => {
    const updatedFromData = {
      ...formData
    }
    dispatch(addProductAttributesAction(updatedFromData)).then(() => {
      dispatch(listProductAttributesAction()); 
      setVisible(false); 
    });
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
      key: 'value',
      label: 'Value',
      _props: { scope: 'col' },
    },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const items = productAttributes?.map((prod) => ({
    ...prod,
    // subcategory: prod.subcategory?.name || '-',
    action: (
      <>
        {/* <CButton
          color="primary"
          size="sm"
          style={{ marginRight: '8px' }}
          onClick={() => handleView(prod.id)}
        >
          View
        </CButton> */}
        <CButton color="primary" size="sm" onClick={() => handleDelete(prod.id)}>
          Delete
        </CButton>
      </>
    ),
  }))

  const handleDelete = (pId) => {
    if (pId) {
      dispatch(deleteProductAttributesAction(pId)).then(() => {
        dispatch(listProductAttributesAction());
      });
    }
  };

  // const handleView = (pId) => {
  //   navigate(`/product-detail/${pId}`)
  // }
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
        Add Product Attributes
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
          <CModalTitle id="VerticallyCenteredExample">Add Product Attribute</CModalTitle>
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
              name="value"
              id="value"
              label="value"
              placeholder="Value"
              value={formData.value}
              onChange={handleInputChange}
              // aria-describedby="exampleFormControlInputHelpInline"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave} >Add Product Attribute</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProductAttributes


