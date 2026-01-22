import { useState } from "react";
import axios from "axios";

export const useDeleteNotice = ({ id, onDeleteSuccess }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL + 'notice/deleteNotice/' + id);

            if (response.data.status) {
                alert(response.data.message);
                handleClose();
                if (onDeleteSuccess) onDeleteSuccess();
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            alert("Помилка видалення: " + msg);
        }
    };

    return {
        show,
        handleShow,
        handleClose,
        handleDelete
    };
};