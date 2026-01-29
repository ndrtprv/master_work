import { Accordion,  Col, Container, Pagination, Row, Spinner, Alert } from 'react-bootstrap';
import { useNoticeList } from './useNoticeList';
import UpdateNotice from '../modals/update_notice_modal/UpdateNotice';
import DeleteNotice from '../modals/delete_notice_modal/DeleteNotice';

function NoticeList() {
    const { 
        notices, 
        pages, 
        activePage, 
        loading, 
        error, 
        changePage
    } = useNoticeList();

    const handleClickPage = (e) => {
        const pageNumber = parseInt(e.target.text || e.target.innerText);
        if (!isNaN(pageNumber)) {
            changePage(pageNumber);
        }
    };

    if (loading && notices.length === 0) {
        return (
            <Container className="mt-3 text-center">
                <Spinner animation="border" variant="primary" />
                <p>Завантаження оголошень...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-3">
                <Alert variant="danger">
                    Не вдалося завантажити оголошення: {error}.<br/>
                    <small>Спробуйте перезавантажити сторінку пізніше.</small>
                </Alert>
            </Container>
        );
    }

    if (!notices || notices.length === 0) {
        return (
            <Container className="mt-2 p-3 text-center" style={{border: '1px solid gray'}}>
                <h5>У вас поки немає оголошень</h5>
            </Container>
        );
    }

    return (
        <Container className='mt-2 p-1' style={{borderStyle: 'solid', borderWidth: '0.2em', borderColor: 'gray'}}>
            <Container className="mt-2 ms-2">
                <h5>Ваші оголошення</h5>
            </Container>
            
            <Accordion>
                {notices.map((notice, index) =>
                    <Accordion.Item key={notice.id || index} eventKey={'' + index}>
                        <Accordion.Header>
                            ID: {notice.id} &nbsp; | &nbsp; {notice.kind}
                        </Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                    <Col md={6}>
                                        {notice.photos && notice.photos.map((photo, i) =>
                                            <img 
                                                key={i} 
                                                src={`data:${photo.contentType};base64,${photo.src_photo}`} 
                                                alt={notice.kind} 
                                                className="img-fluid mb-2 rounded" 
                                                style={{maxHeight: '300px', objectFit: 'cover'}} 
                                            />
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Тип допомоги:</strong> {notice.typeDescription}</p>
                                        <p><strong>Вид допомоги:</strong> {notice.kind}</p>
                                        <Container className="mb-3">
                                            <strong>Опис:</strong>
                                            <p style={{whiteSpace: 'pre-wrap'}}>{notice.description}</p>
                                        </Container>
                                        <Container className="mb-3 d-flex flex-column">
                                            <UpdateNotice notice={notice} refreshList={() => changePage(activePage)} />
                                            <DeleteNotice id={notice.id} onDeleteSuccess={() => changePage(activePage)}/>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>

            {/* Показуємо пагінацію тільки якщо сторінок більше 1 */}
            {pages.length > 1 && (
                <Pagination className="justify-content-center mt-3">
                    {pages.map((page, index) => 
                        <Pagination.Item 
                            key={index} 
                            active={page === activePage} 
                            onClick={handleClickPage}
                        >
                            {page}
                        </Pagination.Item>
                    )}
                </Pagination>
            )}
        </Container>
    );
}

export default NoticeList;