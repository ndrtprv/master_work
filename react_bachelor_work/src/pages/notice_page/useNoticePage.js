import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const useNoticePage = () => {
    const { id } = useParams();
    
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        axios.get(process.env.REACT_APP_API_URL + 'notice/getNotice/' + id)
            .then(response => {
                if (isMounted) {
                    setNotice(response.data.processedNotice);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    console.error(err);
                    setError(err.message || "Не вдалося завантажити оголошення");
                    setLoading(false);
                }
            });

        return () => { isMounted = false };
    }, [id]);

    return {
        notice,
        loading,
        error
    };
};