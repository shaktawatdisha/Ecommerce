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
    // description: '',
    category: '',
    brand:'',
    price:'',
    stock_quantity:'',
    // status:'',
    category: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [ordering, setOrdering] = useState('')

  const [visible, setVisible] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])

  const [brandOptions, setBrandOptions] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.listProduct)
  const { loading: listLoading, error: listError, product: product } = productList

  const categoryList = useSelector((state) => state.listCategory)
  const { loading: listcatLoading, error: listcatError, category: category } = categoryList

  const brandList = useSelector((state) => state.listBrand)
  const { loading: listbrandLoading, error: listBrandError, brand: brand } = brandList
  console.log('Brand List:', brand)

  const productDelete = useSelector((state) => state.listProduct)
  const { loading: deleteLoading, error: deleteError, product: deleteSuccess } = productDelete


  useEffect(() => {
    let query = '?'
  
    if (searchTerm) query += `search=${searchTerm}&`
    if (selectedCategory) query += `category=${selectedCategory}&`
    if (selectedBrand) query += `brand=${selectedBrand}&`
    if (ordering) query += `ordering=${ordering}`
  
    dispatch(listProductAction(query))
    dispatch(listCategoryAction())

  }, [dispatch, searchTerm, selectedCategory, selectedBrand, ordering])

  useEffect(() => {
    if (category){
      const options= category.map((cat)=>({label:cat.name, value: cat.id}))
      setCategoryOptions([{ label: 'Select', value: ''}, ...options])
    }
  }, [category])

  useEffect(() => {
    if (brand){
      const options= brand.map((brd)=>({label:brd.name, value: brd.id}))
      setBrandOptions([{ label: 'Select', value: ''}, ...options])
    }
  }, [brand])


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
      category: formData.category ? parseInt(formData.category, 10): null,
      brand: formData.brand ? parseInt(formData.brand, 10): null,
      stock: formData.stock_quantity ? parseInt(formData.stock_quantity, 10) : 0,
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
      key: 'category',
      label: 'Category',
      _props: { scope: 'col' },
    },
    // {
    //   key: 'description',
    //   label: 'Description',
    //   _props: { scope: 'col' },
    // },
    {
      key: 'brand',
      label: 'Brand',
      _props: { scope: 'col' },
    },
    {
      key: 'price',
      label: 'Price',
      _props: { scope: 'col' },
    },
    {
      key: 'stock_quantity',
      label: 'Stock Quantity',
      _props: { scope: 'col' },
    },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const items = product?.map((prod) => ({
    ...prod,
    category: prod.category?.name || '-',
    brand: prod.brand?.name || '-',
    stock_quantity: prod.stock || '-',

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

  console.log('Product List:', columns, items)
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

      <div className="d-flex mb-3">
        <CFormInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />

        <CFormSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="me-2"
          options={[{ label: 'All Categories', value: '' }, ...categoryOptions]}
        />

        <CFormSelect
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="me-2"
          options={[{ label: 'All Brands', value: '' }, ...brandOptions]}
        />

        <CFormSelect
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          options={[
            { label: 'Sort By', value: '' },
            { label: 'Price Low to High', value: 'price' },
            { label: 'Price High to Low', value: '-price' },
            { label: 'Newest First', value: '-created_at' },
            { label: 'Oldest First', value: 'created_at' },
          ]}
        />
      </div>



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
