import { useState, useEffect } from 'react';
import axios from 'axios';

export const useNotices = () => {
    const [notices, setNotices] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pages, setPages] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotices = async (page) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'notice/getNotices', { 
                params: {
                    activePage: page 
                }
            });

            if (response.data) {
                if (response.data.message !== "It's empty!") {
                    setNotices(response.data.noticesProcessed || []);

                    const totalPages = response.data.pages || 0;
                    let pageArray = [];
                    for (let num = 1; num <= totalPages; num++) {
                        pageArray.push(num);
                    }
                    setPages(pageArray);
                } else {
                    setNotices([]);
                    setPages([]);
                }
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
        if (pageNumber !== activePage) {
            setActivePage(pageNumber);
        }
    };

    return {
        notices,
        activePage,
        pages,
        changePage,
        loading,
        error
    };
};