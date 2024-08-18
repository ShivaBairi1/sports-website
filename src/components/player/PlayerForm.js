import React, { useState } from 'react';
import axios from 'axios';
import './PlayerForm.css';

const PlayerForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        university_hall_ticket_number: '',
        mobile: '',
        email: '',
        profile_picture: null,
        sport_id: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile_picture') {
            setFormData({
                ...formData,
                profile_picture: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== undefined && formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:3000/api/players', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Player created:', response.data);
        } catch (error) {
            console.error('Error creating player:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="player-form">
            <div>
                <label>First Name:</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
            </div>
            <div>
                <label>University Hall Ticket Number:</label>
                <input type="text" name="university_hall_ticket_number" value={formData.university_hall_ticket_number} onChange={handleChange} required />
            </div>
            <div>
                <label>Mobile:</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Profile Picture:</label>
                <input type="file" name="profile_picture" onChange={handleChange} />
            </div>
            <div>
                <label>Sport:</label>
                <select name="sport_id" value={formData.sport_id} onChange={handleChange} required>
                    <option value="">Select Sport</option>
                    <option value="1">BasketBall</option>
                    <option value="2">Cricket</option>
                    <option value="3">Kabbadi</option>
                    <option value="4">VolleyBall</option>
                    <option value="5">FootBall</option>
                    <option value="6">ThrowBall</option>
                    <option value="7">Tennis</option>
                    <option value="8">Badminton</option>
                    <option value="9">KHO-KHO</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PlayerForm;
