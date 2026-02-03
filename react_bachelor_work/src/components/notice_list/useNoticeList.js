import { useState, useEffect } from 'react';
import axios from 'axios';

export const useNoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    axios.defaults.withCredentials = true;
    const fetchNotices = async (page) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'notice/getUsersNotices', { 
                params: {
                    activePage: page 
                }
            });

            if (response.data) {
                setNotices(response.data.noticesProcessed || []);

                const totalPages = response.data.pages || 0;
                let pageArray = [];
                for (let num = 1; num <= totalPages; num++) {
                    pageArray.push(num);
                }
                setPages(pageArray);
            }
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || err.message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices(activePage);
    }, [activePage]);

    const changePage = (pageNumber) => {
        setActivePage(pageNumber);
    };

    return {
        notices,
        pages,
        activePage,
        loading,
        error,
        changePage
    };
};