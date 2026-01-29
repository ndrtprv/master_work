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
        updateNotice,
        isUpdateDisabled
    } = useUpdateNotice({ show, handleClose, notice, refreshList });

    const { type, kind, description } = formData;

    return (
        <>
            <Button variant='primary' onClick={handleShow} className="mb-2 mx-4">Оновити оголошення</Button>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Оновлення оголошення</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                    <Form method="POST">
                        <Form.Control type="hidden" name="_method" value="PUT"/>
                        <Form.Group className="mb-3 registration-field d-flex align-items-center justify-content-center" controlId="formBasicType">
                            <Form.Label><b>Тип допомоги <span style={{color: "red"}}>*</span></b></Form.Label>
                            <Form.Check 
                                inline
                                id="typeUAF" 
                                type="radio" 
                                name={`type`}
                                label="Допомога ЗСУ"
                                value={"Допомога ЗСУ"}
                                checked={type === "Допомога ЗСУ"}
                                onChange={onChange} required 
                            />
                            <Form.Check
                                inline
                                id="typeHuman"
                                type="radio"
                                name={`type`}
                                label="Гуманітарна допомога"
                                value={"Гуманітарна допомога"}
                                checked={type === "Гуманітарна допомога"}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 registration-field d-flex align-items-center justify-content-center">
                            <Form.Label><b>Вид допомоги</b></Form.Label>
                            <Form.Select name="kind" value={kind} onChange={onChange} disabled={!type} required>
                                <option value="">Оберіть...</option>
                                {currentOptions.map((opt, i) => (
                                    <option key={i} value={opt}>{opt}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 registration-field d-flex align-items-center justify-content-center">
                            <Form.Label><b>Опис</b></Form.Label>
                            <Form.Control as="textarea" rows={4} name="description" style={{resize: "none"}} value={description} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 registration-field d-flex align-items-center justify-content-center">
                            <Form.Label><b>Оновити фото (не обов'язково)</b></Form.Label>
                            <Form.Control type="file" name="photo" onChange={onChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Відмінити
                    </Button>
                    <Button className='btn-warning' variant="primary" onClick={updateNotice} disabled={isUpdateDisabled}>
                        Оновити
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateNotice;