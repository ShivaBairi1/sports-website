import React, { useState } from 'react';
import axios from 'axios';

const UploadPhysicalDirectorForm = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [info, setInfo] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleInfoChange = (e) => {
        setInfo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('info', info);

        try {
            const uploadResponse = await axios.post('http://localhost:3000/api/physical_director/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imageUrl = uploadResponse.data.imageUrl;
            const response = await axios.post('http://localhost:3000/api/physical_director', { name, imageUrl, info });
            console.log('Physical Director created successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image or creating physical director:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
                required
            />
            <textarea
                value={info}
                onChange={handleInfoChange}
                placeholder="Additional Information"
                rows="4"
            />
            <input
                type="file"
                onChange={handleImageChange}
                required
            />
            <button type="submit">Upload and Create</button>
        </form>
    );
};

export default UploadPhysicalDirectorForm;
