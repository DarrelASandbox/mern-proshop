import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { Loader, Message, Product, Meta } from '../components/';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { error, products, pages, page } = productList;

  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const displayProductList = () => {
    if (error) return <Message variant='danger'>{error}</Message>;
    if (products.length === 0) return <Loader />;
    return (
      <>
        <Meta />
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>

        <Paginate pages={pages} page={page} keyword={keyword} />
      </>
    );
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {displayProductList()}
    </>
  );
};

export default HomeScreen;
