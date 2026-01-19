import { useState } from "react";
import axios from "axios";

export const useFeedback = () => {
    const [feedbackData, setFeedbackData] = useState({
        name: "",
        email: "",
        topic: "",
        text: "",
    });

    const { name, email, topic, text } = feedbackData;

    const onChange = (e) => {
        setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + 'feedback/send', feedbackData);
            
            if (response.data.status) {
                alert(response.data.message);
                setFeedbackData({ name: "", email: "", topic: "", text: "" });
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            alert(message);
        }
    };

    const isFormValid = name !== "" && email !== "" && topic !== "" && text !== "";

    return {
        feedbackData,
        onChange,
        handleSendMessage,
        isFormValid
    };
};