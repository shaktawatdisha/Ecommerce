import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../Product'
import { listProducts } from '../../redux/actions/productActions'

const ProductListScreen = () => {
  // const userLogin = useSelector((state) => state.userLogin)
  // const {uerror, uloading, userInfo} = userLogin

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <Container>
        <h1 className='mt-4s'>Products</h1>
        {loading ? (
          <h2>Loading...</h2> 
        ) : error ? (
          <h2>{error}</h2>  
        ) : (
          <Row>
            {products.map((product) => (

              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product sProduct={product}/>  
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default ProductListScreen
