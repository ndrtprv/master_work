import { useState, useEffect } from 'react';
import axios from 'axios';

export const useChangeForm = (userData) => {
    const [formData, setFormData] = useState({
        phone_num: "",
        name: "",
        surname: "",
        bio: ""
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                phone_num: userData.phone_num || "",
                name: userData.name || "",
                surname: userData.surname || "",
                bio: userData.bio || ""
            });
        }
    }, [userData]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const update = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + 'user/updateData', formData);
            
            if (response.data.status) {
                alert(response.data.message);
                
                localStorage.removeItem('user_profile_cache');
                
                window.location.reload(); 
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            if (error.response?.data?.message) {
                 alert(error.response.data.message);
            } else {
                 console.log(message);
            }
        }
    };

    const isUpdateDisabled = (
        (
            formData.phone_num === userData.phone_num &&
            formData.name === userData.name && 
            formData.surname === userData.surname &&
            formData.bio === userData.bio
        ) || 
        formData.phone_num === "" || 
        formData.name === "" || 
        formData.surname === ""
    );

    return {
        formData,
        onChange,
        update,
        isUpdateDisabled
    };
};