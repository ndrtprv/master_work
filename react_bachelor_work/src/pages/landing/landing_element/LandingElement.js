import { Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function LandingElement(props) {
    return (
        <>
            <Row className="featurette mx-1">
                <Col md={{span: 7, order: props.order_text}} className="txt_field">
                    <h2 className="featurette-heading lat-h2">{props.object.heading}</h2>
                    {props.object.text}
                    <p className='rob-btn'>
                        <NavLink to={props.object.route} className="lat">
                            <Button type="button" className="btn btn-info" >{props.object.button_title}</Button>
                        </NavLink>
                    </p>
                </Col>
                <Col md={{span: 5, order: props.order_image}} >
                    <svg 
                        className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                        width="500"
                        height="500"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: 500x500"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                    >
                        <image href={props.object.image_path} width="100%" height="100%" />
                    </svg>
                </Col>
            </Row>
            <hr className="featurette-divider"/>
        </>
    );
}

export default LandingElement;