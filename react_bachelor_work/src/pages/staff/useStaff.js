import { useState, useEffect } from 'react';
import axios from 'axios';

export const useStaff = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        axios.get(process.env.REACT_APP_API_URL + 'staff/main')
            .then(response => {
                if (isMounted) {
                    setAdmins(response.data.adminsProcessed || []);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    console.error(err);
                    setError(err.message || "Не вдалося завантажити список адміністрації");
                    setLoading(false);
                }
            });

        return () => { isMounted = false };
    }, []);

    return {
        admins,
        loading,
        error
    };
};