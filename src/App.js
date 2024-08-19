import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GalleryList from './components/gallery/GalleryList';
import EventList from './components/event/EventList';
import PlayerList from './components/player/PlayerList';
import Profile from './components/player/PlayerProfile';
import Achievements from './components/player/playerAchievements';
import PlayerForm from './components/player/PlayerForm';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';


import NewsList from './components/news/NewsList';
import NewsDetail from './components/news/NewsDetail';
import GalleryForm from './components/gallery/GalleryForm';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import EventForm from './components/event/EventForm';
import NewsForm from './components/news/NewsForm';
import SportDetails from './components/sports/SportDetail';
import Directorprofile from './components/directorsprofile';
import Directors from './components/directors';
import SportDetailsPage from './components/SportDetailsPage';
import UploadPhysicalDirectorForm from './components/form/UploadPhysicalDirectorForm';
import UploadSportForm from './components/form/UploadSportForm';
import Sports from './components/sports/Sports';
function App() {
    const handlePlayerFormSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/players', formData);
            console.log('Player created:', response.data);
        } catch (error) {
            console.error('Error creating player:', error);
        }
    };

    return (
        <AuthProvider>
            <Router>
                <div className='app'>
                    <Header />
                    <Navbar />
                    <div className="main-content">
                        <Sidebar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/news" element={<NewsList />} />
                                <Route path="/news/category/:category" element={<NewsList />} />
                                <Route path="/news/item/:id" element={<NewsForm />} />
                                <Route path="/news/:id" element={<NewsDetail />} />
                                <Route path="/gallery" element={<GalleryList />} />
                                <Route path="/directors/:id" element={<Directorprofile />} />
                                <Route path="/directors" element={<Directors />} />
                                <Route path="/sports" element={<Sports />} />
                                <Route path="/sports/:id" element={<SportDetails />} />
                                {/* <Route path="/sports/indoor-games/chess" element={<SportDetails sport="chess" />} />
                                <Route path="/sports/indoor-games/table-tennis" element={<SportDetails sport="table-tennis" />} />
                                <Route path="/sports/indoor-games/badminton" element={<SportDetailsPage sport="badminton" />} />
                                <Route path="/sports/outdoor-games/football" element={<SportDetailsPage sport="football" />} />
                                <Route path="/sports/outdoor-games/cricket" element={<SportDetailsPage sport="cricket" />} />
                                <Route path="/sports/outdoor-games/athletics" element={<SportDetailsPage sport="athletics" />} />
                                <Route path="/sports/outdoor-games/basketball" element={<SportDetails sport="basketball" />} /> */}
                                <Route path="/news/upload" element={<PrivateRoute><NewsForm /></PrivateRoute>} />
                                <Route path="/gallery/upload" element={<PrivateRoute><GalleryForm /></PrivateRoute>} />
                                <Route path="/events/upload" element={<PrivateRoute><EventForm /></PrivateRoute>} />
                                <Route path="/about-us/directors" element={<Directors />} />
<Route path="/about-us/sports-infrastructure" element={<SportDetailsPage />} />

                                <Route path="/events" element={<EventList />} />
                                <Route path="/dashboard" element={<PrivateRoute><Dashboard handlePlayerFormSubmit={handlePlayerFormSubmit} /></PrivateRoute>}>
                                    <Route path="playerform" element={<PlayerForm />} />
                                    <Route path="achievements" element={<Achievements />} />
                                    <Route path="gallery" element={<GalleryForm />} />
                                    <Route path="news" element={<NewsForm />} />
                                    <Route path="events" element={<EventForm />} />
                                    {/* <Route path="achievements" element={<Achievements />} /> */}
                                    <Route path="physical-director-form" element={<UploadPhysicalDirectorForm />} />
                                    <Route path="sport-form" element={<UploadSportForm />} />
                                </Route>
                            </Routes>
                        </main>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
