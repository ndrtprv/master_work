import { Col, Container, Row, Button, Form, Accordion } from 'react-bootstrap';
import Avatar from 'react-avatar';
import './UserPanel.css';
import ChangeForm from '../../components/change_form/ChangeForm';
import NoticeForm from '../../components/notice_form/NoticeForm';
import DeleteUser from '../../components/modals/DeleteUser';
import NoticeList from '../../components/notice_list/NoticeList';
import { useProfile } from './useProfile';

function UserPanel(props) {

  const { userData, avatar, verifiedData, handleSend } = useProfile(props.avatar);

  return (
    <main>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center" md={4} >
            <Avatar alt="Профіль" variant='circular' src={avatar !== props.avatar ? `data:${avatar.contentType};base64,${avatar.data}` : props.avatar} size="15em" />
          </Col>
          <Col md >
            <Container className="justify-content-center">
              <h3>{userData.name} {userData.surname}</h3>
            </Container>
            <Container className={verifiedData ? "justify-content-center" : "justify-content-center m-5"}>
              {
                verifiedData ? 
                <ChangeForm userData={userData} />
                :
                <Form action="post" className="m-12">
                  <h3><b>Ви не підтвердили свої дані. Зробіть це зараз.</b></h3>
                  <Button variant="primary" type="submit" onClick={handleSend} > 
                    Підтвердити дані
                  </Button>
                </Form>
              }
              <DeleteUser />
            </Container>
          </Col>
        </Row>
        {
          verifiedData ? 
          <>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Форма додавання оголошення</Accordion.Header>
                <Accordion.Body>
                  <NoticeForm />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Форма додавання збору</Accordion.Header>
                <Accordion.Body>
                  <Form action="post">

                  </Form>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Форма додавання звіту</Accordion.Header>
                <Accordion.Body>
                  <Form action="post">

                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <NoticeList />
          </>
          :
          <></>
        }
      </Container>
    </main>
  )
}

export default UserPanel