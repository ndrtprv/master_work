import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useStaffPage } from './useStaffPage';

function StaffPage(props) {

    const { admin, avatar, loading, error } = useStaffPage(props.avatar);

    const defaultBio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis nisl sollicitudin, accumsan dui vel, facilisis nulla. Quisque eleifend ornare elit suscipit tristique. Vestibulum justo tortor, tincidunt vitae orci non, porttitor rhoncus tellus. Curabitur non semper massa. Nullam feugiat iaculis.";

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Завантаження профілю...</p>
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

    if (!admin || !admin.user) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="warning">Користувача не знайдено.</Alert>
            </Container>
        );
    }

    return (
        <main>
            <Container className='mt-5'>
                <Row>
                    <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
                        <img src={avatar !== props.avatar ? `data:${avatar.contentType};base64,${avatar.avatar.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} style={{maxWidth: '22em'}} />
                    </Col>
                    <Col md >
                        <Container className="justify-content-center">
                            <h3>{admin.user.name + ' ' + admin.user.surname}</h3>
                            <h5>{admin.role}</h5>
                            <p>Про себе:</p>
                            <p>
                                {
                                    admin.user.bio
                                    ?
                                    admin.user.bio
                                    :
                                    defaultBio
                                }
                            </p>
                            <p>Контакти:</p>
                            <p><i className='fa-solid fa-phone'></i> <a href={`tel:${admin.user.phone_num}`}>{admin.user.phone_num}</a></p>
                            <p><i className="fas fa-envelope"></i> <a href={`mailto:${admin.user.login}`}>{admin.user.login}</a></p>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default StaffPage;