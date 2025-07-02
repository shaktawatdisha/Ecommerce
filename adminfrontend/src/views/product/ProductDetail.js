import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductAction } from '../../redux/actions/productActions'
import { listProductAttributesAction, addProductAttributesAction } from '../../redux/actions/productAttributesActions'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CImage,
  CSpinner,
  CAlert,
  CBadge,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormInput,
  CFormSelect,
  CModalFooter,
} from '@coreui/react'

const ProductDetail = () => {
  const [attributeGroups, setAttributeGroups] = useState({})
  const [formData, setFormData] = useState({
    attributes: [],
    price: '',
    stock: '',
    uploaded_images: null,
  })
  const { pid: prodId } = useParams()
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const productAttributesList = useSelector((state) => state.listProductAttributes)
  const { productAttributes } = productAttributesList

  const productDetail = useSelector((state) => state.fetchProduct)
  const { loading, error, product } = productDetail

  useEffect(() => {
    if (prodId) {
      dispatch(fetchProductAction(prodId))
      dispatch(listProductAttributesAction())
    }
  }, [dispatch, prodId])

  useEffect(() => {
    if (productAttributes) {
      const grouped = {}
      productAttributes.forEach((attr) => {
        if (!grouped[attr.name]) {
          grouped[attr.name] = []
        }
        grouped[attr.name].push(attr)
      })
      setAttributeGroups(grouped)
      console.log("attribute groups", attributeGroups)
    }
  }, [productAttributes])

  // Extract unique attribute types and values (e.g. Color, Size)
  const attributesByType = {}
  product?.skus?.forEach((sku) => {
    sku.attributes?.forEach((attr) => {
      if (!attributesByType[attr.name]) {
        attributesByType[attr.name] = new Set()
      }
      attributesByType[attr.name].add(attr.value)
    })
  })

  // Convert Sets to Arrays for rendering
  Object.keys(attributesByType).forEach((key) => {
    attributesByType[key] = Array.from(attributesByType[key])
  })

  if (loading) return <CSpinner color="primary" />
  if (error) return <CAlert color="danger">{error}</CAlert>

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log("name value", name,value)
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleFileChange = (e) => {
    console.log("file change", e.target.files[0])
    setFormData((prev) => ({ ...prev, uploaded_images: e.target.files[0] }))
  }

  const handleSave = () => {
    console.log("Saving with attributes:", formData)
    const payload = new FormData()
  
    formData.attributes.forEach((attrId) => {
      payload.append('attributes', attrId)
    })
  
    payload.append('price', formData.price)
    payload.append('stock', formData.stock)
    payload.append('product', prodId)
  
    if (formData.uploaded_images) {
      payload.append('uploaded_images', formData.uploaded_images)
    }
  
    dispatch(addProductAttributesAction(payload)).then(() => {
      // instead of product attribute it should be product sku added funtion
      console.log("SKU added successfully", payload)
      dispatch(fetchProductAction(prodId))
      setVisible(false)
      setFormData({
        attributes: [],
        price: '',
        stock: '',
        uploaded_images: null,
      })
    }
  )
  }
  

  return (
    <>
      <CRow>
        {/* Product Info & Root Images */}
        <CCol sm={6}>
          <CCard>
            <CCardBody>
              <CCardTitle>{product.name}</CCardTitle>

              {/* Root level images scroll */}
              <div
                className="auto-scroll-container"
                style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '8px' }}
              >
                {product.images?.length > 0 ? (
                  product.images.map((img) => (
                    <CImage
                      key={img.id}
                      src={img.image}
                      alt={`${product.name} main`}
                      width={120}
                      height={120}
                      style={{ objectFit: 'cover', borderRadius: '6px', flex: '0 0 auto' }}
                    />
                  ))
                ) : (
                  <CImage
                    src="/images/default.jpg"
                    alt="Default"
                    width={120}
                    height={120}
                    style={{ borderRadius: '6px' }}
                  />
                )}
              </div>

              <CListGroup>
                <CListGroupItem>
                  <strong>ID:</strong> {product.id}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Description:</strong> {product.description}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Category:</strong> {product.category}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Brand:</strong> {product.brand}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Available:</strong> {product.is_available ? 'Yes' : 'No'}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}
                </CListGroupItem>
              </CListGroup>

              {/* Render available attribute types */}
              <div className="mt-4">
                <h6>Available Variants</h6>
                {Object.entries(attributesByType).map(([type, values]) => (
                  <div key={type} className="mb-2">
                    <strong>{type}:</strong>{' '}
                    {values.map((val) => (
                      <CBadge color="secondary" className="me-1" key={val}>
                        {val}
                      </CBadge>
                    ))}
                  </div>
                ))}
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* SKUs / Variants */}
        <CCol sm={6}>
          <CButton
            className="mb-2"
            style={{ marginLeft: 'auto', display: 'block' }}
            color="primary"
            size="sm"
            onClick={() => setVisible(!visible)}
          >
            Add Variants
          </CButton>
          <CCard>
            <CCardBody>
              <CCardTitle>Variants (SKUs)</CCardTitle>
              {product.skus?.map((sku) => (
                <CListGroup className="mb-4" key={sku.id}>
                  <CListGroupItem>
                    <strong>SKU Code:</strong> {sku.sku}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Price:</strong> ${sku.price}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Stock:</strong> {sku.stock}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Attributes:</strong>
                    <ul className="mb-0">
                      {sku.attributes?.map((attr) => (
                        <li key={attr.id}>
                          {attr.name}: {attr.value}
                        </li>
                      ))}
                    </ul>
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Images:</strong>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {sku.images?.length > 0 ? (
                        sku.images.map((img) => (
                          <CImage
                            key={img.id}
                            src={img.image}
                            alt={`SKU ${sku.sku}`}
                            width={100}
                            height={100}
                            style={{ objectFit: 'cover', borderRadius: '6px' }}
                          />
                        ))
                      ) : (
                        <div className="text-muted">No images</div>
                      )}
                    </div>
                  </CListGroupItem>
                </CListGroup>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Add Product SKU</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm>
            {Object.entries(attributeGroups).map(([attrName, values]) => (
              <CFormSelect
                key={attrName}
                label={attrName}
                name={attrName}
                className="mb-2"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedId = selectedValue ? parseInt(selectedValue) : null;
                
                  setFormData((prev) => {
                    // Remove any previous selection for this attribute name
                    const filteredAttributes = prev.attributes.filter(
                      (id) => !values.some((v) => v.id === id)
                    );
                
                    // Only add the new ID if it's not null
                    const updatedAttributes = selectedId
                      ? [...filteredAttributes, selectedId]
                      : filteredAttributes;
                
                    return {
                      ...prev,
                      attributes: updatedAttributes,
                    };
                  });
                }}
              >
                <option value="">Select {attrName}</option>
                {values.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.value}
                  </option>
                ))}
              </CFormSelect>
            ))}

            <CFormInput
              type="number"
              name="price"
              id="price"
              label="Price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={handleInputChange}
              className="mb-2"
            />

            <CFormInput
              type="number"
              name="stock"
              id="stock"
              label="Stock"
              placeholder="Enter Stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="mb-2"
            />

            <CFormInput
              type="file"
              name="uploaded_images"
              id="uploaded_images"
              label="Image"
              onChange={handleFileChange}
            />
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save SKU
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProductDetail
