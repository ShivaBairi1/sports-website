import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Header.css';
import Anuraguniversity_logo from '../uploads/AnuragUniversity logo.jpg';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-light border-bottom py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src={Anuraguniversity_logo} alt="Anurag University Logo" style={{ height: '60px', width: 'auto' }} />
                </div>
                <h1 className="h3 mb-0">Anurag University Sports</h1>
                <div className="social-media d-flex gap-3">
                    <a href="https://www.facebook.com/Anuraguniversity/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="https://x.com/anurag_university" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                    <a href="https://www.instagram.com/sportsclub.au/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                    <a href="https://www.linkedin.com/company/anuraguniversity/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>
            </div>
        </header>
    );
};

export default Header;
