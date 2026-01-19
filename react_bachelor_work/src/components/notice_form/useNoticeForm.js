import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTE, OPTIONS_MAP } from '../../utils/constants';

export const useNoticeForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: "",
        kind: "",
        description: "",
        photo: undefined
    });

    const [agreement, setAgreement] = useState(false);
    
    const [currentOptions, setCurrentOptions] = useState([]);

    const { type, kind, description, photo } = formData;

    const onChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo") {
            setFormData(prev => ({ ...prev, photo: files[0] }));
        } 
        else if (name === "type") {
            // ЛОГІКА: Якщо змінили ТИП допомоги
            setFormData(prev => ({ 
                ...prev, 
                type: value, 
                kind: "" // 1. Очищаємо "вид допомоги", бо старий вже не актуальний
            }));
            // 2. Оновлюємо список доступних опцій
            setCurrentOptions(OPTIONS_MAP[value] || []);
        } 
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    axios.defaults.withCredentials = true;

    const sendNotice = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('type', type);
            form.append('kind', kind);
            form.append('description', description);

            if (photo) {
                form.append('photo', photo);
            }

            const response = await axios.post(process.env.REACT_APP_API_URL + 'notice/add', form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.status) {
                alert(response.data.message);
                navigate(USER_ROUTE);
                // Оновлюємо кеш оголошень
                window.location.reload(); 
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            alert(msg);
        }
    };

    const isFormValid = (
        type !== "" && 
        kind !== "" && 
        description !== "" && 
        photo !== undefined && 
        agreement
    );

    return {
        formData,
        agreement,
        setAgreement,
        currentOptions,
        onChange,
        sendNotice,
        isFormValid
    };
};