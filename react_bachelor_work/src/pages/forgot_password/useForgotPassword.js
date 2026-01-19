import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_ROUTE } from '../../utils/constants';

export const useForgotPassword = () => {
    const navigate = useNavigate();
    
    const [login, setLogin] = useState("");
    const [notification, setNotification] = useState(undefined);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + 'user/nav')
            .then(res => {
                if (res.data.status) {
                    navigate(USER_ROUTE);
                }
            }).catch(err => {
                console.log(err.message);
            });
    }, [navigate]);

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };
    
    const forgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + 'user/forgot-password', {
                login
            });

            if (response.data.status) {
                setNotification('Перевірте пошту, на яке надійшло посилання для скидання паролю.');
            }
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || err.message;
            alert(message);
        }
    }

    return {
        login,
        handleLoginChange,
        notification,
        forgotPassword,
        isSubmitDisabled: login === ""
    };
};