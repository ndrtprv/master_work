import { Alert, Button, Card, CardImg, Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { NOTICES_ROUTE } from '../../utils/constants';
import { useNotices } from './useNotices';

function Notices() {

  const { 
    notices, 
    activePage, 
    pages, 
    changePage, 
    loading, 
    error 
  } = useNotices();

  const handleClickPage = (e) => {
    e.preventDefault();
    
    const pageNumber = parseInt(e.target.text || e.target.innerText);
    if (!isNaN(pageNumber)) {
      changePage(pageNumber);
    }
  };

  if (loading && notices.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Помилка завантаження: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      {
        notices.length !== 0 ?
        <>
          <Row className="m-6 p-5" style={{borderWidth: '0.15em'}}>
            {notices.map((notice, index) => 
              <Col key={index} style={{justifyContent: 'space-around', alignContent: 'center', margin: '0.15em'}} lg={4}>
                <Card style={{ alignContent: 'center' }} >
                  <CardImg variant="top" src={`data:${notice.photos[0].contentType};base64,${notice.photos[0].src_photo}`} alt={notice.id + ' ' + notice.kind} />
                  <Card.Body>
                    <Card.Title>{notice.kind}</Card.Title>
                    <Card.Text>
                      Автор: {notice.user.name + " " + notice.user.surname}
                    </Card.Text>
                    <NavLink to={NOTICES_ROUTE + `/${notice.id}`} className="nav-link lat">
                      <Button variant="primary">Докладніше</Button>
                    </NavLink>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
          {pages.length > 1 && (
            <Row>
                <Pagination style={{margin: '1em 1em 0 1em', justifyContent: 'center'}}>
                {pages.map((page, index) => 
                    <Pagination.Item key={index} active={page === activePage} onClick={handleClickPage}>
                    {page}
                    </Pagination.Item>
                )}
                </Pagination>
            </Row>
          )}
        </>
        :
        <Row style={{borderStyle: 'solid', borderColor: 'gray', borderWidth: '0.25em', margin: '3em'}}>
          <Col style={{alignItems: 'center', padding: '8em', textAlign: 'center'}}>
            <h5>Оголошення відсутні</h5>
          </Col>
        </Row>
      }
    </Container>
  );
}

export default Notices;