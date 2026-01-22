import { Button, Modal } from "react-bootstrap";
import { useDeleteNotice } from "./useDeleteNotice";

function DeleteNotice({ id, onDeleteSuccess }) {

    const { 
        show, 
        handleShow, 
        handleClose, 
        handleDelete 
    } = useDeleteNotice({ id, onDeleteSuccess });

    return (
        <>
            <Button className='btn-warning' onClick={handleShow}>Видалити оголошення</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Видалення оголошення</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ви дійсно хочете видалити оголошення?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Відмінити
                    </Button>
                    <Button className='btn-warning' variant="primary" onClick={handleDelete}>
                        Видалити
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteNotice;