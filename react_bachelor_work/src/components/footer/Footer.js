import './Footer.css';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

function Footer(props) {

  var cop_text = "© " + new Date().getFullYear() + " «ValorAid Network». Усі права захищені.";

  return (
    <footer className="footer text-center text-white foot-bottom">
      <Container >
        <Container className="mt-5">
          <Row className="text-center d-flex justify-content-center pt-5">
            {Object.entries(props.data_folded).map(([key, values]) =>
              <Col md={2} key={key}>
                <h6 className="text-uppercase font-weight-bold lat">{key}</h6>
                <ul style={{listStyleType: 'none'}}>
                  {Object.entries(values).map(([path, label]) =>
                    <li key={path}>
                      <Link key={path} to={path} className="text-white">{label}</Link>
                    </li>
                  )}
                </ul>
              </Col>
            )}
            {Object.entries(props.data).map(([path, label]) =>
              <Col md={2} key={path}>
                <h6 className="text-uppercase font-weight-bold lat">
                  <Link key={path} to={path} className="text-white">{label}</Link>
                </h6>
              </Col>
            )}
          </Row>
        </Container>
        <hr className="my-5" />
        <Container className="mb-5">
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
              <p className='rob'>
                Разом ми можемо змінити Україну на краще. Долучайтеся до нас у нашій місії добра та підтримки!
              </p>
            </Col>
          </Row>
        </Container>
        <Container className="text-center mb-5">
          {Object.entries(props.data_media).map(([path, label]) =>
            <Link key={path} to={label} className="text-white me-4">
              <i key={path} className={path}></i>
            </Link>
          )}
        </Container>
      </Container>
      <div className="text-center p-3 foot-back">
        {cop_text} Розроблено <Link to="https://github.com/ndrtprv" className="text-white">Andrii Toporov</Link>
      </div>
    </footer>
  );
}

export default Footer;