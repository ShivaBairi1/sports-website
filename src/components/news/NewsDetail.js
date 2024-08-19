import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/news/${id}`);
                setNewsItem(response.data);
            } catch (error) {
                console.error('Error fetching news item:', error);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (!newsItem) return <p>Loading...</p>;

    return (
        <div className="news-detail">
            {newsItem.banner_image_url && (
                <img src={`http://localhost:3000${newsItem.banner_image_url}`} alt={newsItem.title} />
            )}
            <h1>{newsItem.title}</h1>
            <p>{newsItem.content}</p>
            <small>Published on {new Date(newsItem.date).toLocaleDateString()}</small>
            <p><strong>Sport:</strong> {newsItem.Sport ? newsItem.Sport.name : 'N/A'}</p>

        </div>
    );
};

export default NewsDetail;