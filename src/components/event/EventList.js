import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState('upcoming'); // Default category

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/events/${category}`);
                console.log('Fetched events:', response.data); // Debugging log
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [category]);

    return (
        <div className="event-list">
            <div className="category-selector">
                <button onClick={() => setCategory('upcoming')}>Upcoming Events</button>
                <button onClick={() => setCategory('ongoing')}>Ongoing Events</button>
                <button onClick={() => setCategory('past')}>Past Events</button>
            </div>
            <div className="events">
                {events.length === 0 ? (
                    <p>No events available</p>
                ) : (
                    events.map(event => (
                        <div key={event.event_id} className="event-item">
                            {event.banner_image_url ? (
                                <img src={`http://localhost:3000${event.banner_image_url}`} alt={event.title} />
                            ) : (
                                <p>No banner image</p>
                            )}
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>{new Date(event.date).toLocaleString()}</p> {/* Ensure the date field matches your backend model */}
                        </div>
                    ))
                )}
            </div>
            {/* <div className="button">
                <Link to="/events/upload" className="btn">Add New Event</Link>
            </div> */}
        </div>
    );
};

export default EventList;
