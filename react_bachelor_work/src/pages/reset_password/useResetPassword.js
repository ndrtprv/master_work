import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_ROUTE, USER_ROUTE } from '../../utils/constants';

export const useResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    axios.defaults.withCredentials = true;
    useEffect(() => {
        let isMounted = true;
        axios.get(process.env.REACT_APP_API_URL + 'user/nav')
            .then(res => {
                if (isMounted && res.data.status) {
                    navigate(USER_ROUTE);
                }
            }).catch(err => {
                console.log(err.message);
            });
            
        return () => { isMounted = false };
    }, [navigate]);

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + 'user/reset-password/' + token, {
                password
            });

            if (response.data.status) {
                alert("Пароль успішно змінено!");
                navigate(LOGIN_ROUTE);
            }
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || err.message;
            alert(message);
        }
    };

    const isSubmitDisabled = password !== confirmationPassword || password === "" || confirmationPassword === "";

    return {
        password,
        setPassword,
        confirmationPassword,
        setConfirmationPassword,
        resetPassword,
        isSubmitDisabled
    };
};