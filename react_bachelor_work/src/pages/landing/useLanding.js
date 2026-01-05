import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLanding = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const CACHE_KEY = 'landing_admins_cache';
        const TTL = 30 * 60 * 1000;

        const cachedData = localStorage.getItem(CACHE_KEY);
        const now = new Date().getTime();

        if (cachedData) {
            const { data, expiry } = JSON.parse(cachedData);

            if (now < expiry) {
                console.log("Завантажено адміністраторів з кешу");
                setAdmins(data);
                return;
            }
        }

        console.log("Запит до БД...");
        axios.get(process.env.REACT_APP_API_URL + 'staff/main')
        .then(response => {
            const adminsData = response.data.adminsProcessed;
        
            setAdmins(adminsData);

            const cachePayload = {
                data: adminsData,
                expiry: now + TTL
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
      }).catch(err => {
        console.log(err.message);
      });
    }, []);

    return { admins };
};