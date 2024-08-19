import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [sports, setSports] = useState([]);
    const [selectedSportId, setSelectedSportId] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [message, setMessage] = useState(''); // Success or error message

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

    const handleFileChange = (e) => {
        setBannerImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append('title', eventName);
        formData.append('date', eventDate);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('sport_id', selectedSportId);
        if (bannerImage) {
            formData.append('banner_image', bannerImage);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Event created:', response.data);
            setMessage('Event created successfully!');
            setEventName('');
            setEventDate('');
            setDescription('');
            setLocation('');
            setBannerImage(null);
            setSelectedSportId('');
            document.querySelector('input[type="file"]').value = ''; // Clear file input
        } catch (error) {
            console.error('Error creating event:', error);
            setMessage('Failed to create event. Please try again.');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h2>Upload Event</h2>
            <label>
                Event Name:
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    disabled={loading} // Disable input during loading
                />
            </label>
            <label>
                Event Date:
                <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
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
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    disabled={loading} // Disable input during loading
                />
            </label>
            <label>
                Sport:
                <select
                    value={selectedSportId}
                    onChange={(e) => setSelectedSportId(e.target.value)}
                    required
                    disabled={loading} // Disable input during loading
                >
                    <option value="">Select a sport</option>
                    {sports.map((sport) => (
                        <option key={sport.sport_id} value={sport.sport_id}>
                            {sport.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Banner Image:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading} // Disable input during loading
                />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Upload Event'}
            </button>
            {message && <p>{message}</p>} {/* Display success/failure message */}
        </form>
    );
};

export default EventForm;