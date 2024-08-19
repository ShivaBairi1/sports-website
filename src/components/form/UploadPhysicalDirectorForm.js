import React, { useState } from 'react';
import axios from 'axios';
import './UploadPhysicalDirectorForm.css'; // Import the CSS file

const UploadPhysicalDirectorForm = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [info, setInfo] = useState('');
    const [message, setMessage] = useState(''); // State for success/failure message

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

            setMessage('Physical Director created successfully!'); // Set success message

            // Clear form fields
            setName('');
            setImage(null);
            setInfo('');

            // Optionally, clear the file input field
            document.querySelector('input[type="file"]').value = '';
        } catch (error) {
            setMessage('Error uploading image or creating physical director.'); // Set failure message
            console.error('Error uploading image or creating physical director:', error);
        }
    };

    return (
        <div className="upload-form">
            <h2>Upload Physical Director</h2>
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

            {message && <p className={message.includes('Error') ? 'error' : ''}>{message}</p>} {/* Display success/failure message */}
        </div>
    );
};

export default UploadPhysicalDirectorForm;