import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const useStaffPage = (defaultAvatar) => {
    const { id } = useParams();
    
    // Початкові стани
    const [admin, setAdmin] = useState(null);
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        axios.get(process.env.REACT_APP_API_URL + 'staff/one/' + id)
            .then(response => {
                if (isMounted) {
                    const fetchedAdmin = response.data.processedAdmin;
                    setAdmin(fetchedAdmin);

                    if (fetchedAdmin?.user?.avatar) {
                        setAvatar(fetchedAdmin.user.avatar);
                    } else {
                        setAvatar(defaultAvatar);
                    }
                    
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    console.error(err);
                    setError(err.message || "Не вдалося завантажити дані співробітника");
                    setLoading(false);
                }
            });

        return () => { isMounted = false };
    }, [id, defaultAvatar]);

    return {
        admin,
        avatar,
        loading,
        error
    };
};