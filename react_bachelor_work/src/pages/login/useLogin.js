import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_ROUTE } from '../../utils/constants';
import { UserContext } from '../../context/UserContext';

export const useLoginLogic = () => {
    const navigate = useNavigate();
    const { checkAuth } = useContext(UserContext);

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const { login, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

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

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + 'user/login', {
                login, password
            });

            if (response.data.status) {
                await checkAuth();
                navigate(USER_ROUTE);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert(error.message);
            }
        }
    };

    return { login, password, onChange, logIn };
};