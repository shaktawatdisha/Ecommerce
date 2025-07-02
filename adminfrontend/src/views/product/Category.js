// import React, { useEffect, useState } from 'react'
// import {
//   CTable,
//   CButton,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CForm,
//   CFormInput,
//   CFormSelect,
// } from '@coreui/react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { listCategoryAction, deleteCategoryAction, addCategoryAction } from '../../redux/actions/categoryActions'

// const Category = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     // subcategory: 0,
//   })
//   const [visible, setVisible] = useState(false)
//   const [subcategoryOptions, setSubcategoryOptions] = useState([])

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const categoryList = useSelector((state) => state.listCategory)
//   const { loading: listLoading, error: listError, category: category } = categoryList
//   console.log("category",category)

//   const categoryDelete = useSelector((state) => state.listCategory)
//   const { loading: deleteLoading, error: deleteError, category: deleteSuccess } = categoryDelete

//   useEffect(() => {
//     dispatch(listCategoryAction())
//   }, [])

//   useEffect(() => {
//     // Populate subcategory options when category data changes
//     if (category) {
//       const options = category.map((cat) => ({ label: cat.name, value: cat.id }))
//       setSubcategoryOptions([{ label: 'Select', value: '' }, ...options])
//     }
//   }, [category])

//   const handleInputChange = (e) => {
//     console.log("e",e)
//     const {name, value} = e.target
//     setFormData((prevData)=>({
//       ...prevData,
//       [name]: value
//     }))
//   }

//   const handleSave = () => {
//     const updatedFormData = {
//       ...formData,
//       subcategory: formData.subcategory ? parseInt(formData.subcategory, 10) : null,
//     }
//     dispatch(addCategoryAction(updatedFormData))
//     setVisible(!visible)
//   }

//   const columns = [
//     {
//       key: 'id',
//       label: 'Id',
//       _props: { scope: 'col' },
//     },
//     {
//       key: 'name',
//       label: 'Name',
//       _props: { scope: 'col' },
//     },
//     // {
//     //   key: 'subcategory',
//     //   label: 'Sub Category',
//     //   _props: { scope: 'col' },
//     // },
//     {
//       key: 'action',
//       label: 'Action',
//       _props: { scope: 'col' },
//     },
//   ]

//   const items = category?.map((cat) => ({
//     ...cat,
//     subcategory: cat.subcategory?.name || '-',
//     action: (
//       <>
//         <CButton
//           color="primary"
//           size="sm"
//           style={{ marginRight: '8px' }}
//           onClick={() => handleView(cat.id)}
//         >
//           View
//         </CButton>
//         <CButton color="primary" size="sm" onClick={() => handleDelete(cat.id)}>
//           Delete
//         </CButton>
//       </>
//     ),
//   }))

//   const handleDelete = (catId) => {
//     if (catId) {
//       dispatch(deleteCategoryAction(catId))
//     }
//   }

//   const handleView = (catId) => {
//     navigate(`/category-detail/${catId}`)
//   }
//   return (
//     <>
//       {/* {listLoading && <p>Loading categories...</p>}
//       {listError && <p>Error loading categories: {listError}</p>} */}
//       <CButton
//         className="mb-2"
//         style={{ marginLeft: 'auto', display: 'block' }}
//         color="success"
//         size="sm"
//         onClick={() => setVisible(!visible)}
//       >
//         Add Category
//       </CButton>


//       {/* <div className="d-flex mb-3">
//         <CFormInput
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="me-2"
//         />

//         <CFormSelect
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="me-2"
//           options={[{ label: 'All Categories', value: '' }, ...categoryOptions]}
//         />

//         <CFormSelect
//           value={selectedCategory}
//           onChange={(e) => setSelectedBrand(e.target.value)}
//           className="me-2"
//           options={[{ label: 'All Brands', value: '' }, ...brandOptions]}
//         />

//         <CFormSelect
//           value={ordering}
//           onChange={(e) => setOrdering(e.target.value)}
//           options={[
//             { label: 'Sort By', value: '' },
//             { label: 'Price Low to High', value: 'price' },
//             { label: 'Price High to Low', value: '-price' },
//             { label: 'Newest First', value: '-created_at' },
//             { label: 'Oldest First', value: 'created_at' },
//           ]}
//         />
//       </div> */}
      
//       <CTable columns={columns} items={items} />
//       {/* {deleteLoading && <p>Deleting category...</p>}
//       {deleteError && <p>Error deleting category: {deleteError}</p>} */}

//       {/* Modal */}
//       <CModal
//         alignment="center"
//         visible={visible}
//         onClose={() => setVisible(false)}
//         aria-labelledby="VerticallyCenteredExample"
//       >
//         <CModalHeader>
//           <CModalTitle id="VerticallyCenteredExample">Add Category</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CForm>
//             <CFormInput
//               type="text"
//               id="name"
//               name="name"
//               label="Name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="mb-2"
//               // aria-describedby="exampleFormControlInputHelpInline"
//             />
//             {/* <CFormSelect
//               id="subcategory"
//               label="SubCategory"
//               name = "subcategory"
//               aria-label="Default select example"
//               value={formData.subcategory}
//               onChange={handleInputChange}
//               options={subcategoryOptions} 
//             /> */}
//           </CForm>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setVisible(false)}>
//             Close
//           </CButton>
//           <CButton color="primary" onClick={handleSave}>Save changes</CButton>
//         </CModalFooter>
//       </CModal>
//     </>
//   )
// }

// export default Category









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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  listCategoryAction,
  deleteCategoryAction,
  addCategoryAction,
} from '../../redux/actions/categoryActions'

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    subcategory: '',
  })
  const [visible, setVisible] = useState(false)
  const [subcategoryOptions, setSubcategoryOptions] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.listCategory)
  const { loading: listLoading, error: listError, category: category } = categoryList

  useEffect(() => {
    dispatch(listCategoryAction())
  }, [dispatch])

  useEffect(() => {
    if (category) {
      const options = category.map((cat) => ({ label: cat.name, value: cat.id }))
      setSubcategoryOptions([{ label: 'Select', value: '' }, ...options])
    }
  }, [category])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = () => {
    const updatedFormData = {
      ...formData,
      subcategory: formData.subcategory ? parseInt(formData.subcategory, 10) : null,
    }
    dispatch(addCategoryAction(updatedFormData)).then(() => {
      dispatch(listCategoryAction())
      setVisible(false)
      setFormData({ name: '', subcategory: '' })
    })
  }

  const handleDelete = (catId) => {
    if (catId) {
      dispatch(deleteCategoryAction(catId)).then(() => {
        dispatch(listCategoryAction())
      })
    }
  }

  const handleView = (catId) => {
    navigate(`/category-detail/${catId}`)
  }

  const columns = [
    { key: 'id', label: 'Id', _props: { scope: 'col' } },
    { key: 'name', label: 'Name', _props: { scope: 'col' } },
    { key: 'action', label: 'Action', _props: { scope: 'col' } },
  ]

  const items = category?.map((cat) => ({
    ...cat,
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
        <CButton color="danger" size="sm" onClick={() => handleDelete(cat.id)}>
          Delete
        </CButton>
      </>
    ),
  }))

  const renderAccordion = () => {
    return (
      <CAccordion className="mt-4">
        {category?.map((cat) => (
          <CAccordionItem itemKey={cat.id} key={cat.id}>
            <CAccordionHeader>{cat.id} - {cat.name}</CAccordionHeader>
            <CAccordionBody>
              {cat.subcategories && cat.subcategories.length > 0 ? (
                <ul className="ms-3">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.id}>{sub.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No subcategories</p>
              )}
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>
    )
  }

  return (
    <>
      <CButton
        className="mb-2"
        style={{ marginLeft: 'auto', display: 'block' }}
        color="success"
        size="sm"
        onClick={() => setVisible(true)}
      >
        Add Category
      </CButton>

      {/* <CTable columns={columns} items={items} /> */}

      {/* Accordion for Subcategories */}
      {renderAccordion()}

      {/* Modal to Add Category */}
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="name"
              name="name"
              label="Name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-2"
            />
            <CFormSelect
              id="subcategory"
              label="Subcategory Of (Optional)"
              name="subcategory"
              aria-label="Select Subcategory"
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
          <CButton color="primary" onClick={handleSave}>
            Save Category
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Category
