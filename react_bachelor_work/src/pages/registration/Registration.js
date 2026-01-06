import './Registration.css';
import { NavLink } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import { LOGIN_ROUTE } from '../../utils/constants';
import { useRegistration } from './useRegistration';

function Registration() {

    const { 
        formData, 
        onChange, 
        signup, 
        confirmationPassword, 
        setConfirmationPassword, 
        agreement, 
        setAgreement,
        isFormValid 
    } = useRegistration();

    // Деструктуризація для зручності використання в JSX
    const { login, phone_num, password, name, surname, bio } = formData;

    return (
        <main style={{display: 'inline-flex', flexDirection: 'column'}} >
            
            <Form method="post" className='mx'>
                <h2>Реєстрація</h2>
                <Form.Group className="mb-3 registration-field" controlId="formBasicEmail">
                    <Form.Label><b>Email <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="email" placeholder="Введіть Ваш email" name="login" value={login} onChange={onChange} required />
                </Form.Group>

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

                <Form.Group className="mb-3 registration-field" controlId="formBasicBio">
                    <Form.Label><b>Додатково</b></Form.Label>
                    <Form.Control as="textarea" type="text" resize="none" placeholder="Введіть додаткові дані про вас" name="bio" value={bio} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicAvatar">
                    <Form.Label><b>Фото профілю</b></Form.Label>
                    <Form.Control type="file" accept="image/*" alt="Оберіть фото" name="avatar" onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicPassword">
                    <Form.Label><b>Пароль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" name="password" 
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,255}$" 
                        value={password} onChange={onChange} required 
                    />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicConfirmPassword">
                    <Form.Label><b>Підтвердження пароля <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль ще раз" name="confirmation_password"
                        value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} required 
                    />
                </Form.Group>

                <Form.Group className="mb-3 registration-field">
                    <Form.Label htmlFor={"roleUser"}><b>Роль <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Check type="radio" name="isAdminCandidate" id="roleUser" label="Користувач" value={false} onClick={onChange} required />
                    <Form.Check type="radio" name="isAdminCandidate" id="roleAdmin" label="Адмін" value={true} onClick={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field">
                    <Form.Label htmlFor={"hideDataYes"}><b>Приховати дані? <span style={{color: "red"}}>*</span></b></Form.Label>
                    <Form.Check type="radio" name="hideData" id="hideDataYes" label="Так" value={true} onClick={onChange} required />
                    <Form.Check type="radio" name="hideData" id="hideDataNo" label="Ні" value={false} onClick={onChange} />
                </Form.Group>

                <Form.Group className="mb-3 registration-field" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Я приймаю умови використання даного сайту" name="agreement"
                        checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!isFormValid} onClick={signup}>
                    Зареєструватися
                </Button>

                <Form.Group className="mt-3 registration-field align-items-center" >
                    <p className='my-1'><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</p>
                    <p className='my-1'>Пароль має містити не менше 8 символів</p>
                    <p className='my-1'>Пароль має містити мінімум 1 велику літеру</p>
                    <p className='my-1'>Пароль має містити мінімум 1 малу літеру</p>
                    <p className='my-1'>Пароль має містити мінімум 1 цифру</p>
                    <p className='my-1'>Пароль має містити мінімум 1 символ</p>
                </Form.Group>
            </Form>

            <Container style={{backgroundColor: 'beige', borderRadius: '0.5em', display: 'inline-flex', flexDirection: 'column'}} >
                <p className="text-center my-2">Уже зареєстровані? <NavLink to={LOGIN_ROUTE} >Авторизуватися</NavLink></p>
            </Container>
        </main>
    );
}

export default Registration;