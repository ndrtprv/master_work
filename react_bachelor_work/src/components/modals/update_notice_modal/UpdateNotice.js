import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUpdateNotice } from "./useUpdateNotice";

function UpdateNotice({ notice, refreshList }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { 
        formData, 
        currentOptions, 
        onChange, 
        updateNotice 
    } = useUpdateNotice({ show, handleClose, notice, refreshList });

    const { type, kind, description } = formData;

    return (
        <>
            <Button variant='primary' onClick={handleShow}>Оновити оголошення</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Оновлення оголошення</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST">
                        <Form.Control type="hidden" name="_method" value="PUT"/>
                        <Form.Group className="mb-3 registration-field" controlId="formBasicType">
                            <Form.Label><b>Тип допомоги <span style={{color: "red"}}>*</span></b></Form.Label>
                            <Form.Check id="typeUAF" type="radio" name={`type`} label="Допомога ЗСУ" value={"Допомога ЗСУ"} onClick={onChange} required />
                            <Form.Check id="typeHuman"  type="radio" name={`type`} label="Гуманітарна допомога" value={"Гуманітарна допомога"} onClick={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Вид допомоги</Form.Label>
                            <Form.Select name="kind" value={kind} onChange={onChange} disabled={!type} >
                                <option value="">Оберіть...</option>
                                {currentOptions.map((opt, i) => (
                                    <option key={i} value={opt}>{opt}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Опис</Form.Label>
                            <Form.Control as="textarea" rows={4} name="description" value={description} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Оновити фото (не обов'язково)</Form.Label>
                            <Form.Control type="file" name="photo" onChange={onChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Відмінити
                    </Button>
                    <Button className='btn-warning' variant="primary" onClick={updateNotice}>
                        Оновити
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateNotice;