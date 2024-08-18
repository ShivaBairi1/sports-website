import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(''); // Added location
    const [bannerImage, setBannerImage] = useState(null);
    const [sports, setSports] = useState([]);
    const [selectedSportId, setSelectedSportId] = useState('');

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
        const formData = new FormData();
        formData.append('title', eventName);
        formData.append('date', eventDate);
        formData.append('description', description);
        formData.append('location', location); // Append location to formData
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
            setEventName('');
            setEventDate('');
            setDescription('');
            setLocation(''); // Clear location after submission
            setBannerImage(null);
            setSelectedSportId(''); // Clear sport_id after submission
        } catch (error) {
            console.error('Error creating event:', error);
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
                />
            </label>
            <label>
                Event Date:
                <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </label>
            <label>
                Sport:
                <select
                    value={selectedSportId}
                    onChange={(e) => setSelectedSportId(e.target.value)}
                    required
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
                />
            </label>
            <button type="submit">Upload Event</button>
        </form>
    );
};

export default EventForm;
