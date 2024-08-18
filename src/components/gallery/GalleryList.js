import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GalleryList.css';

const GalleryList = () => {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/gallery');
                setGalleryItems(response.data);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            }
        };

        fetchGalleryItems();
    }, []);

    return (
        <>
            <div className="gallery-list">
                {galleryItems.map(item => (
                    <div key={item.gallery_id} className="gallery-item">
                        {item.image_url ? (
                            <img src={`http://localhost:3000${item.image_url}`} alt={item.title} />
                        ) : (
                            <p>No image available</p>
                        )}
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.Sport && <p>Sport: {item.Sport.name}</p>}
                    </div>
                ))}
            </div>
            {/* <div id="a" className='button'>
                <Link to="/gallery/upload">Upload Gallery</Link>
            </div> */}
        </>
    );
};

export default GalleryList;
