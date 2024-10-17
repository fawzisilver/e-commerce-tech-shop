import { Pagination } from 'react-bootstrap'
import { LinkContainer  } from 'react-router-bootstrap'


const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => ( //map through the pages 
                <LinkContainer key={x + 1}
                    to={
                        !isAdmin ? `/page/${x + 1}`     // {x+1} is pageNumber
                        : `/admin/productlist/page/${x + 1}`  // {x+1} is pageNumber
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
)
}

export default Paginate