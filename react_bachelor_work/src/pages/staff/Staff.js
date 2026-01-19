import './Staff.css';
import { Alert, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { STAFF_ROUTE } from '../../utils/constants';
import { useStaff } from './useStaff';

function Staff(props) {

    const { admins, loading, error } = useStaff();

    if (loading) {
        return (
            <Container className='d-flex justify-content-center mt-5'>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className='d-flex justify-content-center mt-5'>
                <Alert variant="danger">Помилка: {error}</Alert>
            </Container>
        );
    }

    return (
        <main>
            <Container className='d-flex justify-content-md-center mt-5'>
                <Row>
                    {admins.map((admin, index) => 
                        <Col key={index} lg={4} className='p-2'>
                            <Card style={{width: '12rem'}}>
                                <CardImg variant="top" style={{padding: '0.5em'}} src={admin.user.avatars ? `data:${admin.user.avatars.contentType};base64,${admin.user.avatars.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} />
                                <CardBody>
                                    <CardTitle>{admin.user.name + " " + admin.user.surname}</CardTitle>
                                    <CardText>{admin.role}</CardText>
                                    <NavLink to={STAFF_ROUTE + `/${admin.admin_id}`} className="nav-link lat">
                                        <Button variant="primary">Докладніше</Button>
                                    </NavLink>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </main>
    );
}

export default Staff;