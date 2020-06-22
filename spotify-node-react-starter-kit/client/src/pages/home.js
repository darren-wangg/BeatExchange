import React, { Component } from 'react';
import './home.css';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

export class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyApi: props.spotifyApi,
            song: '',
            data: null
        }
    }

    // getNowPlaying() {
    //     this.state.spotifyApi.getMyCurrentPlaybackState()
    //         .then((response) => {
    //             this.setState({
    //                 nowPlaying: {
    //                     name: response.item.name,
    //                     albumArt: response.item.album.images[0].url
    //                 }
    //             });
    //         });
    // }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            song: e.target.value.trim() === '' ? 'Nujabes' : e.target.value.trim()
        });
        this.state.spotifyApi.searchTracks(this.state.song, { limit: 5 })
            .then((data) => {
                this.setState({
                    data: data
                })
                console.log(data);
            }
            ).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="profile">
                            <h2>Profile</h2>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="wall">
                            <div className="search">
                                <MDBCol>
                                    <MDBFormInline className="md-form" onSubmit={this.handleSubmit}>
                                        <MDBIcon icon="search" />
                                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="What do you want to share with the world?" aria-label="Search" onChange={this.handleInputChange} />
                                        <button className="uk-button uk-button-primary">Search</button>
                                    </MDBFormInline>
                                </MDBCol>
                            </div>
                            {this.state.data &&
                                <div>
                                    <h2>{this.state.song}</h2>
                                    <img width="20%" src={this.state.data.tracks.items[0].album.images[0].url} alt="Album Art" />
                                    <h3>{this.state.data.tracks.items[0].name}</h3>
                                    <h3>{this.state.data.tracks.items[0].artists[0].name}</h3>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="trending">
                            <h2>Trending</h2>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default home
