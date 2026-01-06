import { Button, Form, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SIGNUP_ROUTE, FORGOT_ROUTE } from '../../utils/constants';
import './Login.css';
import { useLoginLogic } from './useLogin';

function Login() {

    const { login, password, onChange, logIn } = useLoginLogic();

    return (
        <main style={{display: 'inline-flex', flexDirection: 'column'}} >
            
            <Form method="post">
                <h2>Вхід до системи</h2>
                <Form.Group className="mb-3 login-field" controlId="formBasicEmail">
                    <Form.Label><b>Email <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="email" placeholder="Введіть email" name="login" value={login} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3 login-field" controlId="formBasicPassword">
                    <Form.Label><b>Пароль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" name="password" value={password} onChange={onChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={login === "" || password === ""} onClick={logIn}>
                    Увійти
                </Button>

                <Form.Group className="mt-3 registration-field" >
                    <p className='my-1'><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</p>
                </Form.Group>
            </Form>
            
            <Container style={{backgroundColor: 'beige', borderRadius: '0.5em', display: 'inline-flex', flexDirection: 'column'}} >
                <p className="text-center my-1"><NavLink to={FORGOT_ROUTE} >Забули пароль?</NavLink></p>
                <p className="text-center my-1">Не маєте користувача? <NavLink to={SIGNUP_ROUTE} >Зареєструватися</NavLink></p>
            </Container>
        </main>
    );
}

export default Login;