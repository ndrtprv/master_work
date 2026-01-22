import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNoticePage } from './useNoticePage';

function NoticePage() {

  const { notice, loading, error } = useNoticePage();

  if (loading) {
    return (
        <Container className="mt-5 text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Завантаження деталей оголошення...</p>
        </Container>
    );
  }

  if (error) {
    return (
        <Container className="mt-5">
            <Alert variant="danger">Помилка: {error}</Alert>
        </Container>
    );
  }

  if (!notice || !notice.photos || notice.photos.length === 0) {
    return (
        <Container className="mt-5 text-center">
            <Alert variant="warning">Оголошення не знайдено або воно не містить фото.</Alert>
        </Container>
    );
  }

  const authorName = notice.user ? `${notice.user.name} ${notice.user.surname}` : "Невідомий";
  const authorPhone = notice.user?.phone_num || "";
  const authorEmail = notice.user?.login || "";

  return (
    <main className="align-items-center">
      <Container className='my-3 mx-auto'>
        <Row className='justify-content-around'>
          <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
            <img src={`data:${notice.photos[0].contentType};base64,${notice.photos[0].src_photo}`} alt={notice.id + ' ' + notice.typeDescription} style={{maxWidth: '25em'}} />
          </Col>
          <Col md={4} >
            <Container className="justify-content-center">
              <h3>{notice.typeDescription}</h3>
              <h5>{notice.kind}</h5>
              <p>Деталі:</p>
              <p>{notice.description}</p>
              <p>Контакти:</p>
              <p>Автор: {authorName}</p>
              {authorPhone && (
                  <p>
                    <i className='fa-solid fa-phone me-2'></i> 
                    <a href={`tel:${authorPhone}`} style={{textDecoration: 'none'}}>{authorPhone}</a>
                  </p>
              )}
              {authorEmail && (
                  <p>
                    <i className="fas fa-envelope me-2"></i> 
                    <a href={`mailto:${authorEmail}`} style={{textDecoration: 'none'}}>{authorEmail}</a>
                  </p>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default NoticePage