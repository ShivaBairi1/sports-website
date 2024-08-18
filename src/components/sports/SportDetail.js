import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlayersList from '../player/PlayerList'; // Adjust import path as needed
import PlayerProfile from '../player/PlayerProfile'; // Adjust import path as needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './SportDetail.css'; // Custom CSS for specific tweaks

const SportDetails = () => {
    const { id } = useParams(); // Access sport ID from URL
    const [selectedSport, setSelectedSport] = useState(null);
    const [players, setPlayers] = useState([]);
    const [galleryItems, setGalleryItems] = useState([]);
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch sport details when a sport is selected
    useEffect(() => {
        if (id) {
            const fetchDetails = async () => {
                setLoading(true);
                setPlayers([]);
                setGalleryItems([]);
                setNews([]);
                setEvents([]);

                try {
                    // Fetch sport details based on sport ID
                    const sportResponse = await axios.get(`http://localhost:3000/api/sports/${id}`);
                    setSelectedSport(sportResponse.data);

                    // Fetch players associated with the selected sport
                    const playerResponse = await axios.get(`http://localhost:3000/api/players`);
                    setPlayers(playerResponse.data);

                    // Fetch gallery items associated with the selected sport
                    const galleryResponse = await axios.get(`http://localhost:3000/api/gallery/by-sport/${id}`);
                    setGalleryItems(galleryResponse.data);

                    // Fetch news related to the selected sport
                    const newsResponse = await axios.get(`http://localhost:3000/api/news/by-sport/${id}`);
                    setNews(newsResponse.data);

                    // Fetch events related to the selected sport
                    const eventResponse = await axios.get(`http://localhost:3000/api/events/by-sport/${id}`);
                    setEvents(eventResponse.data);
                } catch (error) {
                    console.error('Error fetching sport details:', error);
                    setError('Failed to load sport details');
                } finally {
                    setLoading(false);
                }
            };

            fetchDetails();
        }
    }, [id]);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">Error: {error}</div>;

    return (
        <div className="sport-details container mt-4">
            {selectedSport && !selectedPlayer ? (
                <>
                    <div className="row mb-4">
                        <div className="col-md-4 text-center">
                            <img
                                src={selectedSport.image_url}
                                alt={selectedSport.name}
                                className="img-fluid rounded sport-image"
                            />
                        </div>
                        <div className="col-md-8">
                            <h1>{selectedSport.name}</h1>
                            <p>{selectedSport.description}</p>
                        </div>
                    </div>

                    <section className="mb-4">
                        <h3>Players</h3>
                        <PlayersList players={players} onPlayerClick={handlePlayerClick} />
                    </section>

                    <section className="mb-4">
                        <h3>Gallery</h3>
                        <div className="row">
                            {galleryItems.map((item) => (
                                <div key={item.gallery_id} className="col-md-4 col-sm-6 mb-3">
                                    <div className="card">
                                        <img
                                            src={`http://localhost:3000${item.image_url}`}
                                            alt={item.title}
                                            className="card-img-top gallery-image"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-4">
                        <h3>News</h3>
                        <ul className="list-group">
                            {news.map((newsItem) => (
                                <li key={newsItem.news_id} className="list-group-item">
                                    {newsItem.banner_image_url && (
                                        <img
                                            src={`http://localhost:3000${newsItem.banner_image_url}`}
                                            alt={newsItem.title}
                                            className="img-fluid news-image mb-2"
                                        />
                                    )}
                                    <h4>{newsItem.title}</h4>
                                    <p>{newsItem.content}</p>
                                    <small>Published on {new Date(newsItem.date).toLocaleDateString()}</small>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h3>Events</h3>
                        <ul className="list-group">
                            {events.map((event) => (
                                <li key={event.event_id} className="list-group-item">
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                    <small>Event date: {new Date(event.date).toLocaleDateString()}</small>
                                </li>
                            ))}
                        </ul>
                    </section>
                </>
            ) : selectedPlayer ? (
                <div className="player-profile-container">
                    <PlayerProfile id={selectedPlayer.player_id} />
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() => setSelectedPlayer(null)}
                    >
                        Back to Players
                    </button>
                </div>
            ) : (
                <div>Select a sport to view details</div>
            )}
        </div>
    );
};

export default SportDetails;
