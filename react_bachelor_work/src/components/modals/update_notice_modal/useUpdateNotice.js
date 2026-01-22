import { useEffect, useState } from "react";
import { OPTIONS_MAP } from "../../../utils/constants";
import axios from "axios";

export const useUpdateNotice = (props) => {
    const { show, handleClose, notice, refreshList } = props;

    const [formData, setFormData] = useState({
        id: "",
        type: "",
        kind: "",
        description: "",
        photo: undefined
    });

    const [currentOptions, setCurrentOptions] = useState([]);

    useEffect(() => {
        if (notice && show) {
            const initialType = notice.typeDescription || (notice.type === 0 ? "Допомога ЗСУ" : "Гуманітарна допомога");
            
            setFormData({
                id: notice.id,
                type: initialType,
                kind: notice.kind,
                description: notice.description,
                photo: undefined
            });

            setCurrentOptions(OPTIONS_MAP[initialType] || []);
        }
    }, [notice, show]);

    const onChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo") {
            setFormData(prev => ({ ...prev, photo: files[0] }));
        } 
        else if (name === "type") {
            setFormData(prev => ({ 
                ...prev, 
                type: value, 
                kind: "" 
            }));
            setCurrentOptions(OPTIONS_MAP[value] || []);
        } 
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const updateNotice = async () => {
        try {
            const form = new FormData();
            form.append('type', formData.type);
            form.append('kind', formData.kind);
            form.append('description', formData.description);

            if (formData.photo) {
                form.append('photo', formData.photo);
            }

            const response = await axios.post(process.env.REACT_APP_API_URL + 'notice/updateNotice/' + formData.id, form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.status) {
                alert(response.data.message);
                handleClose();
                if (refreshList) refreshList(1);
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            alert("Помилка оновлення: " + msg);
        }
    };

    return {
        formData,
        currentOptions,
        onChange,
        updateNotice
    };
};