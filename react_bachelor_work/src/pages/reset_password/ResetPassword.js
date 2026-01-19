import { Button, Form } from 'react-bootstrap';
import { useResetPassword } from './useResetPassword';

function ResetPassword() {

    const {
        password,
        setPassword,
        confirmationPassword,
        setConfirmationPassword,
        resetPassword,
        isSubmitDisabled
    } = useResetPassword();

    return (
        <main className='mt-5'>
            <Form method="post">
                <h2>Змінити пароль</h2>

                <Form.Group className="mb-3 registration-field" controlId="formBasicPassword">
                    <Form.Label><b>Новий пароль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicConfirmPassword">
                    <Form.Label><b>Підтвердження нового пароля <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль ще раз" name="confirmation_password"
                        value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)}  required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitDisabled} onClick={resetPassword}>
                    Змінити пароль
                </Button>

                <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                    <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
                </Form.Group>
            </Form>
        </main>
    );
}

export default ResetPassword