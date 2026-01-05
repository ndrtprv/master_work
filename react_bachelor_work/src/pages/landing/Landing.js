import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './Landing.css';
import uaf_help from '../../resources/uaf_help.jpg';
import humanitarian from '../../resources/humanitarian.jpg';
import volunteer from '../../resources/volunteer.jpg';
import LandingCarousel from '../../components/carousel/LandingCarousel';
import { landing_elements, STAFF_ROUTE } from '../../utils/constants';
import Feedback from '../../components/feedback/Feedback';
import { useLanding } from './useLanding';
import LandingElement from './landing_element/LandingElement';

function Landing(props) {

  const headerFeedback = "Зворотній зв'язок";
  const textFeedback = "Якщо вас цікавлять певні питання, зв'яжіться з нами, заповнивши форму.";
  const classNameContainer = "d-flex flex-column justify-content-center";
  const classNameForm = "p-2";

  const { admins } = useLanding();

  return (
    <main>
      <LandingCarousel uaf_help={uaf_help} humanitarian={humanitarian} volunteer={volunteer} />
      <Container className="marketing">
        <LandingElement order_text={1} order_image={2} object={landing_elements[0]} />
        <Row className="mx-1">
          <h2 className="featurette-heading lat-h2">Склад благодійного фонду</h2>
          {admins.map((admin, index) =>
            <Col lg={4} key={index}>
              <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><image href={admin.user.avatars ? `data:${admin.user.avatars.contentType};base64,${admin.user.avatars.data}` : props.avatar} alt={admin.user.name + ' ' + admin.user.surname} width="140" height="140" /></svg>
              <h3 className='lat-h3'>{admin.user.name + ' ' + admin.user.surname}</h3>
              <p className='rob'>{admin.role}</p>
              <p className='rob-btn'>
                <NavLink to={STAFF_ROUTE + `/${admin.admin_id}`} className="lat">
                  <Button type="button" className="btn btn-secondary" >Деталі »</Button>
                </NavLink>
              </p>
            </Col>
          )}
        </Row>
        <hr className="featurette-divider"/>
        <LandingElement order_text={2} order_image={1} object={landing_elements[1]} />
        <LandingElement order_text={1} order_image={2} object={landing_elements[2]} />
        <Row className="featurette mx-1">
          <Feedback isSmall={false} headerFeedback={headerFeedback} textFeedback={textFeedback} classNameContainer={classNameContainer} classNameForm={classNameForm} />
        </Row>
      </Container>
    </main>
  );
}

export default Landing;