import React, { useState } from 'react';
import axios from 'axios';
import './UploadSportForm.css'; // Import the CSS file

const UploadSportForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(''); // State for success/failure message

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

            setMessage('Sport created successfully!'); // Set success message

            // Clear form fields
            setName('');
            setDescription('');
            setImage(null);

            // Optionally, clear the file input field
            document.querySelector('input[type="file"]').value = '';
        } catch (error) {
            setMessage('Error uploading image or creating sport.'); // Set failure message
            console.error('Error uploading image or creating sport:', error);
        }
    };

    return (
        <div className="upload-sport-form">
            <h2>Create Sport</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Sport Name"
                    required
                />
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    required
                />
                <button type="submit">Upload and Create</button>
            </form>

            {message && <p className={message.includes('Error') ? 'error' : ''}>{message}</p>} {/* Display success/failure message */}
        </div>
    );
};

export default UploadSportForm;
