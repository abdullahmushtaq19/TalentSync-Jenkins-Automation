import React, { useEffect, useState } from 'react';

const Protected = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtected = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`/api/auth/protected`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
                });

                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                setMessage('Access denied');
            }
        };

        fetchProtected();
    }, []);

    return <p>{message}</p>;
};

export default Protected;
