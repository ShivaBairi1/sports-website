import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GalleryForm.css';

const GalleryForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [message, setMessage] = useState(''); // Message for success/failure

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
        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('sportName', selectedSport);

        try {
            const response = await axios.post('http://localhost:3000/api/gallery', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Gallery item created:', response.data);
            setMessage('Gallery item created successfully!');
            setTitle('');
            setDescription('');
            setImage(null);
            setSelectedSport('');
            document.querySelector('input[type="file"]').value = ''; // Clear file input
        } catch (error) {
            console.error('Error creating gallery item:', error);
            setMessage('Failed to create gallery item. Please try again.');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <form className="gallery-form" onSubmit={handleSubmit}>
            <h2>Upload Gallery Item</h2>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={loading} // Disable input during loading
                />
            </label>
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    disabled={loading} // Disable input during loading
                />
            </label>
            <label>
                Sport:
                <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    required
                    disabled={loading} // Disable select during loading
                >
                    <option value="">Select a sport</option>
                    {sports.map(sport => (
                        <option key={sport.sport_id} value={sport.name}>
                            {sport.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Image:
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    disabled={loading} // Disable input during loading
                />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p>{message}</p>} {/* Display success/failure message */}
        </form>
    );
};

export default GalleryForm;