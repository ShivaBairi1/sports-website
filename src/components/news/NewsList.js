import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './NewsList.css';

const NewsList = () => {
    const [newsPosts, setNewsPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sportMap, setSportMap] = useState({}); // Mapping sport_id to sport name

    useEffect(() => {
        // Fetch all news posts
        const fetchNewsPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/news');
                setNewsPosts(response.data);
            } catch (error) {
                console.error('Error fetching news posts:', error);
            }
        };

        // Fetch sports for filtering and displaying
        const fetchSports = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sports');
                const sports = response.data;
                // Create a map from sport ID to sport name
                const sportMap = {};
                sports.forEach(sport => {
                    sportMap[sport.sport_id] = sport.name;
                });
                setSportMap(sportMap);

                // Extract unique sport IDs from fetched sports
                const uniqueCategories = sports.map(sport => sport.sport_id);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };

        fetchNewsPosts();
        fetchSports();
    }, []);

    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        try {
            const response = category
                ? await axios.get(`http://localhost:3000/api/news/by-sport/${category}`)
                : await axios.get('http://localhost:3000/api/news');

            setNewsPosts(response.data);
        } catch (error) {
            console.error('Error fetching news by category:', error);
        }
    };

    return (
        <div className="news-list">
            <h2>Sports News</h2>
            <div className="filter">
                <label htmlFor="category">Filter by Sport:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Sports</option>
                    {categories.map((categoryId) => (
                        <option key={categoryId} value={categoryId}>
                            {sportMap[categoryId] || `Sport ${categoryId}`} {/* Display name */}
                        </option>
                    ))}
                </select>
            </div>
            <div className="news-items">
                {newsPosts.map(post => (
                    <div key={post.news_id} className="news-item">
                        {post.banner_image_url && (
                            <img src={`http://localhost:3000${post.banner_image_url}`} alt={post.title} className="banner-image" />
                        )}
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p><strong>Published on:</strong> {new Date(post.date).toLocaleDateString()}</p>
                        <p><strong>Sport:</strong> {post.Sport.name}</p>
                        <Link to={`/news/${post.news_id}`} className="btn">View Full News</Link>
                    </div>
                ))}
            </div>
            {/* <div className="button">
                <Link to="/news/upload" className="btn">Add New News</Link>
            </div> */}
        </div>
    );
};

export default NewsList;
