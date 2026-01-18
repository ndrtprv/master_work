import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LANDING_ROUTE } from '../../utils/constants';

export const useProfile = (defaultAvatar) => {
    const navigate = useNavigate();

    const [verifiedData, setVerifiedData] = useState(true);
    const [avatar, setAvatar] = useState(defaultAvatar); 
    const [userData, setUserData] = useState({});

    axios.defaults.withCredentials = true;

    useEffect(() => {
        let isMounted = true;

        axios.get(process.env.REACT_APP_API_URL + 'user/profile')
            .then(res => {
                if (isMounted) {
                    if (res.data.status) {
                        setUserData(res.data.user);

                        if (res.data.user.verifiedAt === null) {
                            setVerifiedData(false);
                        }

                        if (res.data.portrait !== null) {
                            setAvatar(res.data.portrait);
                        }
                    } else {
                        navigate(LANDING_ROUTE);
                    }
                }
            })
            .catch(err => {
                console.error("Помилка завантаження профілю:", err);
                navigate(LANDING_ROUTE);
            });

        return () => { isMounted = false };
    }, [navigate]);

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + 'user/resend');
            console.log(response);
            if (response.data.status) {
                alert(response.data.message);
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            alert('Не вдалося надіслати листа за вказаною адресою. ' + message);
        }
    };

    return {
        userData,
        avatar,
        verifiedData,
        handleSend
    };
}