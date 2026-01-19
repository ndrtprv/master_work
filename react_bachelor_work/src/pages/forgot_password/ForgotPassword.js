import { Button, Container, Form } from 'react-bootstrap';
import { useForgotPassword } from './useForgotPassword';

function ForgotPassword() {

  // Використовуємо логіку з хука
  const { 
    login, 
    handleLoginChange, 
    notification, 
    forgotPassword, 
    isSubmitDisabled 
  } = useForgotPassword();

  return (
    <main className='mt-5'>
      {notification !== undefined ? 
        <Container style={{backgroundColor: 'green', color: 'white'}}>
          <b>{notification}</b>
        </Container>
        : <></>
      }
      
      <Form method="post" >
        <h2>Забули пароль?</h2>

        <Form.Group className="mb-3 login-field" controlId="formBasicEmail">
          <Form.Label><b>Ваш email</b></Form.Label>
          <Form.Control type="email" placeholder="Введіть ваш email" name="login" value={login} onChange={handleLoginChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={forgotPassword} disabled={isSubmitDisabled}>
          Відправити посилання на пошту
        </Button>
      </Form>
    </main>
  );
}

export default ForgotPassword;