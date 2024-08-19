import React from 'react';
import './Footer.css';
import logo from '../uploads/AnuragUniversity logo.jpg'; // Import your logo image here

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section logo">
                        <img src={logo} alt="Logo" className="footer-logo" />
                        <p>&copy; 2024 Anurag University. All rights reserved.</p>
                    </div>

                    <div className="footer-section navigation">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/sports">Sports</a></li>
                            <li><a href="/news">News</a></li>
                            <li><a href="/events">Events</a></li>
                            <li><a href="/gallery">Gallery</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-section contact">
                        <h2>Contact Information</h2>
                        <p><strong>Address:</strong> Venkatapur, Ghatkesar, Medchal-Malkajgiri district, Hyderabad, Telangana, India. 500 088</p>
                        <p><strong>Email:</strong> <a href="mailto:info@anurag.edu.in">info@anurag.edu.in</a></p>
                        <p><strong>Phone:</strong> +91-8181057057</p>
                        <p><strong>Directions:</strong> <a href="https://maps.app.goo.gl/4HArKdEyZTwTS12z8" target="_blank" rel="noopener noreferrer">Get Directions</a></p>
                    </div>

                    <div className="footer-section social">
                        <h2>Follow Us</h2>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
