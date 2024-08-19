import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Breadcrumbs from '../components/Breadcrumbs';
import football from '../uploads/1723975549368.jpeg';
import annualsports from '../uploads/annual sports meet.jpeg';

const Home = () => {
    const [directors, setDirectors] = useState([]);
    const [sports, setSports] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);

    const breadcrumbs = [
        { path: '/', label: 'Home' }
    ];

    // Fetch physical directors from the API
    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/physical_director');
                const data = await response.json();
                setDirectors(data);
            } catch (error) {
                console.error('Error fetching physical directors:', error);
            }
        };

        fetchDirectors();
    }, []);

    // Fetch sports data from the API
    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/sports');
                const data = await response.json();
                setSports(data);
            } catch (error) {
                console.error('Error fetching sports data:', error);
            }
        };

        fetchSports();
    }, []);

    // Fetch a limited number of gallery images for the Home page
    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/gallery?limit=4'); // Limit to 4 images
                const data = await response.json();
                setGalleryImages(data);
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            }
        };

        fetchGalleryImages();
    }, []);

    return (
        <div className="home">
            <Breadcrumbs crumbs={breadcrumbs} />
            <div className="container">
                <section id="about" className="about">
                    <h1>About Anurag University</h1>
                    <p>Anurag University is a leading institution known for its excellence in academics and sports. We strive to provide our students with the best opportunities to excel in both areas.</p>
                </section>

                <section id="directors" className="directors">
                    <h2>Physical Directors</h2>
                    <div className="directors-list">
                        {directors.length > 0 ? (
                            directors.map(director => (
                                <Link to={`/directors/${director.id}`} key={director.id} className="director-profile">
                                    <img src={director.image || 'https://via.placeholder.com/150'} alt={director.name} />
                                    <h3>{director.name}</h3>
                                    <p>{director.info}</p>
                                </Link>
                            ))
                        ) : (
                            <p>No physical directors found.</p>
                        )}
                    </div>
                </section>

                <section id="sports" className="sports-offered">
                    <h2>Sports Offered</h2>
                    <div className="sports-list">
                        {sports.map(sport => (
                            <Link 
                                key={sport.sport_id} 
                                to={`/sports/${sport.sport_id}`} 
                                className="sport-item"
                            >
                                <h3>{sport.name}</h3>
                                <img 
                                    src={sport.image_url} 
                                    alt={sport.name} 
                                    className="sport-image" 
                                />
                            </Link>
                        ))}
                    </div>
                </section>

                <section id="events" className="events">
                    <h2>Recent Events</h2>
                    <div className="event">
                        <h3>Annual Sports Meet 2024</h3>
                        <p>Our annual sports meet was a huge success, with students participating in various sports and showcasing their talents.</p>
                        <img src={annualsports} alt="Annual Sports Meet" />
                    </div>
                    <div className="event">
                        <h3>Inter-University Football Championship</h3>
                        <p>Anurag University hosted the Inter-University Football Championship, where teams from across the region competed.</p>
                        <img src={football} alt="Football Championship" />
                    </div>
                </section>

                <section id="gallery" className="gallery">
                    <h2>Gallery</h2>
                    <div className="gallery-images">
                        {galleryImages.length > 0 ? (
                            galleryImages.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={`http://localhost:3000${image.image_url}`} 
                                    alt={image.title || `Gallery Image ${index + 1}`} 
                                />
                            ))
                        ) : (
                            <p>No images available in the gallery.</p>
                        )}
                    </div>
                </section>

                <section id="achievements" className="achievements">
                    <h2>Achievements</h2>
                    <p>Our students have excelled in various sports, winning numerous championships and medals. We are proud of their achievements and continue to support them in their athletic pursuits.</p>
                    <ul>
                        <li>National Basketball Championship - 2023</li>
                        <li>Inter-University Football Champions - 2022</li>
                        <li>State-level Cricket Tournament Winners - 2021</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Home;