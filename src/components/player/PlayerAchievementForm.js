import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AchievementForm = ({ onAchievementAdded }) => {
    const { playerId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image_url', image);
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/achievements/${playerId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onAchievementAdded(response.data);
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <button type="submit">Add Achievement</button>
        </form>
    );
};

export default AchievementForm;