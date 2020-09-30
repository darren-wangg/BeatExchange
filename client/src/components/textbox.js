import React, { Component } from 'react';
import './textbox.css';

export default class textbox extends Component {
    render() {
        return (
            <div>
                <div className="form-group blue-border-focus">
                    <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows="3"></textarea>
                    <button className="post-btn">Post</button>
                </div>
            </div>
        )
    }
}
