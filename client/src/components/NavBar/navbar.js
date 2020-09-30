import React, { Component } from 'react';
import './navbar.css';
import { Link } from "react-router-dom";

export class navbar extends Component {
    render() {
        return (
            <nav>
                <div className="logo">
                    <Link to="/">
                        <i className="fas fa-compact-disc fa-2x" style={{ color: 'white' }}></i>
                    </Link>
                </div>
                <div className="nav">
                    <Link className="home" to="/home">Home</Link>
                    <a href='http://localhost:8888'><button className="login-btn">Log In</button></a>
                </div>
            </nav>
        )
    }
}

export default navbar