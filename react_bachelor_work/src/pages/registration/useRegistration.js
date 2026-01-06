import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_ROUTE, LANDING_ROUTE } from '../../utils/constants';

export const useRegistration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        phone_num: "",
        password: "",
        name: "",
        surname: "",
        bio: "",
        avatar: undefined,
        isAdminCandidate: "",
        hideData: ""
    });

    const { login, phone_num, password, name, surname, bio, avatar, isAdminCandidate, hideData } = formData;

    const [disableButton, setDisableButton] = useState(true);
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [agreement, setAgreement] = useState(false);

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            
            if (e.target.name === "password") {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,255}$/;
                if (!e.target.value.match(passwordRegex)) {
                    setDisableButton(true);
                } else {
                    setDisableButton(false);
                }
            }
        }
    };

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

    const signup = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('login', login);
            form.append('phone_num', phone_num);
            form.append('password', password);
            form.append('name', name);
            form.append('surname', surname);
            form.append('bio', bio);
            form.append('isAdminCandidate', isAdminCandidate);
            form.append('hideData', hideData);

            if (avatar) {
                form.append('avatar', avatar);
            }

            const response = await axios.post(process.env.REACT_APP_API_URL + 'user/signup', 
                form,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            if (response.data.status) {
                navigate(LANDING_ROUTE);
                alert("Повідомлення про підтвердження даних надіслано на вашу пошту. Дійсне 15 хвилин.");
            }
        } catch (e) {
            if (e.response && e.response.data) {
                alert(e.response.data.message);
            } else {
                alert(e.message);
            }
        }
    };

    const isFormValid = !(
        login === "" || phone_num === "" ||
        name === "" || surname === "" ||
        isAdminCandidate === "" || hideData === "" ||
        disableButton || password !== confirmationPassword ||
        password === "" || confirmationPassword === "" ||
        !agreement
    );

    return {
        formData,
        onChange,
        signup,
        confirmationPassword,
        setConfirmationPassword,
        agreement,
        setAgreement,
        isFormValid
    };
};