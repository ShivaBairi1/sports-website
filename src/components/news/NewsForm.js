import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './NewsForm.css';

const NewsForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sportId, setSportId] = useState('');
    const [sports, setSports] = useState([]);
    const [bannerImage, setBannerImage] = useState(null);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sports');
                setSports(response.data);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };

        fetchSports();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('sport_id', sportId);
        if (bannerImage) {
            formData.append('banner_image_url', bannerImage);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('News item created:', response.data);
            setTitle('');
            setContent('');
            setSportId('');
            setBannerImage(null);
        } catch (error) {
            console.error('Error creating news item:', error);
        }
    };

    return (
        <form className="news-form" onSubmit={handleSubmit}>
            <h2>Create News Item</h2>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Content:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </label>
            <label>
                Sport:
                <select value={sportId} onChange={(e) => setSportId(e.target.value)} required>
                    <option value="">Select a Sport</option>
                    {sports.map(sport => (
                        <option key={sport.sport_id} value={sport.sport_id}>{sport.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Banner Image:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBannerImage(e.target.files[0])}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewsForm;
