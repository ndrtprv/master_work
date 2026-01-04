import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { LANDING_ROUTE, USER_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, ADMIN_ROUTE } from '../../../utils/constants';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';

function NavigationPanel(props) {

    const navigate = useNavigate();
    
    const { isLoggedIn, isAdmin, avatar, logOut } = useContext(UserContext); 

    const handleLogout = () => {
        logOut(navigate);
    }
    
    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-dark bg-dark" aria-label="navbar">
            <Container className="container-fluid">
                <NavLink to={LANDING_ROUTE} className="navbar-brand"><img src={props.brand} alt="ValorAid Network" className='mybrand' /></NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav me-auto mx-auto">
                        {Object.entries(props.data_folded).map(([key, values]) => 
                            <NavDropdown key={key} title={key} className="nav-item dropdown">
                                {Object.entries(values).map(([path, label]) =>
                                    <NavLink key={path} to={path} className="dropdown-item lat">{label}</NavLink>
                                )}
                            </NavDropdown>
                        )}
                        {Object.entries(props.data).map(([path, label]) =>
                            <NavLink key={path} to={path} className="nav-link lat">{label}</NavLink>
                        )}
                    </Nav>
                    <Nav className="nav navbar-right">
                        { isLoggedIn ?
                            <>
                                <NavLink to={USER_ROUTE} className="nav-link lat">
                                    <Avatar alt="Профіль" src={(avatar && avatar.data) ? `data:${avatar.contentType};base64,${avatar.data}` : props.avatar} size="2.4em" />
                                </NavLink>
                                {
                                    isAdmin ? 
                                    <NavLink to={ADMIN_ROUTE} className="nav-link lat">
                                        <Button type="button" className="btn btn-primary my-2 rob-btn" >Адмін панель</Button>
                                    </NavLink>
                                    : 
                                    <></>
                                }
                                <NavLink to={LANDING_ROUTE} className="nav-link lat">
                                    <Button type="button" className="btn btn-warning my-2 rob-btn" onClick={handleLogout}>Вийти</Button>
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to={LOGIN_ROUTE} className="nav-link lat">
                                    <Button type="button" className="btn btn-outline-light me-2 my-2 rob-btn">Увійти</Button>
                                </NavLink>
                                <NavLink to={SIGNUP_ROUTE} className="nav-link lat">
                                    <Button type="button" className="btn btn-warning my-2 rob-btn">Зареєструватися</Button>
                                </NavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationPanel;