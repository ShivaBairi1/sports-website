import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navbar.css';

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => setExpanded(!expanded);
    const handleClose = () => setExpanded(false);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
            <Container>
                <Navbar.Brand as={Link} to="/">Anurag University</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" onClick={handleClose}>
                        <NavDropdown title="About Us" id="about-us-dropdown" onClick={e => e.stopPropagation()}>
                            <NavDropdown.Item as={Link} to="/about-us/directors">Physical Directors</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about-us/sports-infrastructure">Sports Infrastructure</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Sports" id="sports-dropdown" onClick={e => e.stopPropagation()}>
                            <NavDropdown title="Indoor Games" id="indoor-games-dropdown">
                                <NavDropdown.Item as={Link} to="/sports/7">Chess</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/8">Badminton</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/9">Table Tennis</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/10">Carroms</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Outdoor Games" id="outdoor-games-dropdown">
                                <NavDropdown.Item as={Link} to="/sports/1">Basketball</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/2">Cricket</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/3">VolleyBall</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/4">Kabaddi</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/5">FootBall</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/6">KhoKho</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sports/11">ThrowBall</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropdown>

                        <NavDropdown title="Discover" id="discover-dropdown" onClick={e => e.stopPropagation()}>
                            <NavDropdown.Item as={Link} to="/news">News</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/events">Events</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/gallery">Gallery</NavDropdown.Item>
                        </NavDropdown>

                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as="button" onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
