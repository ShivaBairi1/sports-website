import React, { useState } from 'react';
import axios from 'axios';

const UploadSportForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const uploadResponse = await axios.post('http://localhost:3000/api/sports/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = uploadResponse.data.imageUrl;

            const response = await axios.post('http://localhost:3000/api/sports', { name, description, imageUrl });
            console.log('Sport created successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image or creating sport:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Sport Name" required />
            <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" required />
            <input type="file" onChange={handleImageChange} required />
            <button type="submit">Upload and Create</button>
        </form>
    );
};

export default UploadSportForm;
