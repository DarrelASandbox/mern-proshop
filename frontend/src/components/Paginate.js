import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((pg) => (
          <LinkContainer
            key={pg + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${pg + 1}`
                  : `/page/${pg + 1}`
                : `/admin/productlist/${pg + 1}`
            }>
            <Pagination.Item active={pg + 1 === page}>{pg + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
