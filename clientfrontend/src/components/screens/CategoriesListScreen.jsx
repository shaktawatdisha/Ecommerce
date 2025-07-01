import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { listCategory } from '../../redux/actions/categoryActions'
import Category from '../Category'


const CategoriesListScreen = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, category } = categoryList

  useEffect(() => {
    dispatch(listCategory())
  }, [dispatch])

  return (
    <>
      <Container>
        <h1 className='mt-4s'>Categories</h1>
        {loading ? (
          <h2>Loading...</h2> 
        ) : error ? (
          <h2>{error}</h2>  
        ) : (
          <Row>
            {category.map((cCategory) => (

              <Col key={cCategory.id} sm={12} md={6} lg={4} xl={3}>
                <Category sCategory={cCategory}/>  
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default CategoriesListScreen



// import React from 'react'

// const CategoriesListScreen = () => {
//   return (
//     <div>CategoriesListScreen</div>
//   )
// }

// export default CategoriesListScreen