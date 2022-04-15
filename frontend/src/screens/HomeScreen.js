import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { Loader, Message, Product } from '../components/';

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { error, products } = productList;

  const dispatch = useDispatch();
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const displayProductList = () => {
    if (error) return <Message variant='danger'>{error}</Message>;
    if (products.length === 0) return <Loader />;
    return (
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <h1>Latest Products</h1>
      {displayProductList()}
    </>
  );
};

export default HomeScreen;
