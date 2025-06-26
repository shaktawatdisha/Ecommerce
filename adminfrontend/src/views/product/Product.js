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
import { listProductAction, deleteProductAction, addProductAction } from '../../redux/actions/productActions'
import { listCategoryAction } from '../../redux/actions/categoryActions'
import { sassNull } from 'sass'

const Product = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // brand:'',
    price:'',
    // stock_quantity:'',
    // status:'',
    category: '',
  })
  const [visible, setVisible] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.listProduct)
  const { loading: listLoading, error: listError, product: product } = productList

  const categoryList = useSelector((state) => state.listCategory)
  const { loading: listcatLoading, error: listcatError, category: category } = categoryList

  const productDelete = useSelector((state) => state.listProduct)
  const { loading: deleteLoading, error: deleteError, product: deleteSuccess } = productDelete



  useEffect(() => {
    dispatch(listProductAction())
    dispatch(listCategoryAction())
    
  }, [dispatch])

  useEffect(() => {
    if (category){
      const options= category.map((cat)=>({label:cat.name, value: cat.id}))
      setCategoryOptions([{ label: 'Select', value: ''}, ...options])
    }
  }, [category])


  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = () => {
    const updatedFromData = {
      ...formData,
      category: formData.category ? parseInt(formData.category, 10): null
    }
    dispatch(addProductAction(updatedFromData)).then(() => {
      dispatch(listProductAction()); 
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
      key: 'description',
      label: 'Description',
      _props: { scope: 'col' },
    },
    // {
    //   key: 'brand',
    //   label: 'Brand',
    //   _props: { scope: 'col' },
    // },
    {
      key: 'price',
      label: 'Price',
      _props: { scope: 'col' },
    },
    // {
    //   key: 'stock_quantity',
    //   label: 'Stock Quantity',
    //   _props: { scope: 'col' },
    // },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const items = product?.map((prod) => ({
    ...prod,
    // subcategory: prod.subcategory?.name || '-',
    action: (
      <>
        <CButton
          color="primary"
          size="sm"
          style={{ marginRight: '8px' }}
          onClick={() => handleView(prod.id)}
        >
          View
        </CButton>
        <CButton color="primary" size="sm" onClick={() => handleDelete(prod.id)}>
          Delete
        </CButton>
      </>
    ),
  }))

  const handleDelete = (pId) => {
    if (pId) {
      dispatch(deleteProductAction(pId)).then(() => {
        dispatch(listProductAction());
      });
    }
  };

  const handleView = (pId) => {
    navigate(`/product-detail/${pId}`)
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
        Add Product
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
          <CModalTitle id="VerticallyCenteredExample">Add Product</CModalTitle>
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
            <CFormInput
              type="text"
              name="brand"
              id="brand"
              label="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleInputChange}
              // aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="text"
              name="price"
              id="price"
              label="Price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              // aria-describedby="exampleFormControlInputHelpInline"
            />
            <CFormInput
              type="text"
              name="stock_quantity"
              label="Stock Quantity"
              placeholder="Stock Quantity"
              value={formData.stockquantity}
              onChange={handleInputChange}
              // aria-describedby="exampleFormControlInputHelpInline"
            />
            {/* <CFormInput
              type="text"
              name="status"
              id="status"
              checked={formData.status}
              label="Status"
              // placeholder="Status"
              // value={formData.status}
              onChange={handleInputChange}
              // aria-describedby="exampleFormControlInputHelpInline"
            /> */}
            <CFormSelect
              id="category"
              label="Category"
              name = "category"
              aria-label="Default select example"
              value={formData.category}
              onChange={handleInputChange}
              options={categoryOptions} 
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave} >Add Product</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Product
