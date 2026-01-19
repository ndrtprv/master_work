import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useChangeForm } from './useChangeForm';

function ChangeForm(props) {

    const { 
        formData, 
        onChange, 
        update, 
        isUpdateDisabled 
    } = useChangeForm(props.userData);

    const { phone_num, name, surname, bio } = formData;

    return (
        <Form action="post" className="m-2">
            <h4>Зміна даних</h4>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 registration-field" controlId="formBasicNumber">
                            <Form.Label><b>Номер телефону <span style={{color: "red"}}>*</span></b></Form.Label>
                            <Form.Control type="tel" placeholder="Введіть Ваш номер телефону" name="phone_num" value={phone_num} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3 registration-field" controlId="formBasicName">
                            <Form.Label><b>Ім'я <span style={{color: "red"}}>*</span></b></Form.Label>
                            <Form.Control type="text" placeholder="Введіть Ваше ім'я" name="name" value={name} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3 registration-field" controlId="formBasicSurname">
                            <Form.Label><b>Прізвище <span style={{color: "red"}}>*</span></b></Form.Label>
                            <Form.Control type="text" placeholder="Введіть Ваше прізвище" name="surname" value={surname} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3 registration-field" controlId="formBasicBio">
                            <Form.Label><b>Додатково</b></Form.Label>
                            <Form.Control as="textarea" type="text" resize="none" rows={8} placeholder="Введіть додаткові дані про вас" name="bio" value={bio} onChange={onChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" type="submit" disabled={ isUpdateDisabled } onClick={update}>
                        Оновити дані
                    </Button>

                    <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                        <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                    </Form.Group>
                </Row>
            </Container>
        </Form>
    )
};

export default ChangeForm;