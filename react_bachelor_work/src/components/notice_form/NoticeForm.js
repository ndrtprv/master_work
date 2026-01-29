import { Button, Form } from 'react-bootstrap';
import { useNoticeForm } from './useNoticeForm';

function NoticeForm() {

    const { 
        formData, 
        agreement, 
        setAgreement, 
        currentOptions, 
        onChange, 
        sendNotice, 
        isFormValid 
    } = useNoticeForm();

    const { type, kind, description } = formData;

    return (
        <Form method="post">
            <Form.Group className="mb-3 registration-field" controlId="formBasicType">
                <Form.Label><b>Тип допомоги <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Check id="typeUAF" type="radio" name={`type`} label="Допомога ЗСУ" value={"Допомога ЗСУ"} onClick={onChange} required />
                <Form.Check id="typeHuman"  type="radio" name={`type`} label="Гуманітарна допомога" value={"Гуманітарна допомога"} onClick={onChange} />
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicKind">
                <Form.Label><b>Вид допомоги <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Select type="text" placeholder="Оберіть вид матеріальної допомоги" name="kind" value={kind} onChange={onChange} required disabled={!formData.type} >
                    <option value="">
                        {type === "" ? "Спочатку оберіть тип допомоги вище" : "Оберіть зі списку..."}
                    </option>
                    {currentOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicDescription">
                <Form.Label><b>Опис <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Control as="textarea" type="text" style={{resize: "none"}} placeholder="Введіть опис допомоги" name="description" value={description} onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicPhoto">
                <Form.Label><b>Фото (лише одне) <span style={{color: "red"}}>*</span></b></Form.Label>
                <Form.Control type="file" accept="image/*" alt="Оберіть фото" name="photo" onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3 registration-field" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Я приймаю умови використання даного сайту" name="agreement"
                    checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required 
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={ !isFormValid } onClick={sendNotice}>
                Додати оголошення
            </Button>

            <Form.Group className="mt-3 registration-field" controlId="formBasicTip">
                <Form.Label><b><span style={{color: "red"}}>*</span></b> - обов'язково до заповнення</Form.Label>
            </Form.Group>
        </Form>
    );
};

export default NoticeForm;