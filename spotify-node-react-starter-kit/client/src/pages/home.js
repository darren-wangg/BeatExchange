import React, { Component } from 'react';
import './home.css';
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

export class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyApi: props.spotifyApi,
            song: '',
            data: null,
            search: []
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
        this.state.spotifyApi.searchTracks(this.state.song, { limit: 6 })
            .then((data) => {
                this.setState({
                    data: data
                }), this.searchSongs();
            }
            ).catch(error => {
                console.log(error);
            });
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            song: e.target.value.trim()
        });
    }

    searchSongs = () => {
        const cols = [];
        if (this.state.data) {
            this.state.data.tracks.items.forEach((song) =>
                cols.push(
                    <MDBCol key={song.id} sm="4" md="3" lg="2">
                        <a href={song.external_urls.spotify} target="_blank"><img className="searchImg" src={song.album.images[0].url} alt="Album Art" /></a>
                        <p style={{ wordWrap: "break-word" }}><strong>{song.name}</strong></p>
                        <p>{song.artists[0].name}</p>
                    </MDBCol>
                )
            );
        }
        this.setState({
            search: cols
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-lg-2">
                        <div className="profile">
                            <h2>Profile</h2>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-8">
                        <div className="wall">
                            <div className="search">
                                <MDBCol>
                                    <MDBFormInline className="md-form" onSubmit={this.handleSubmit}>
                                        <MDBIcon icon="search" />
                                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="What do you want to share with the world?" aria-label="Search" style={{ width: "100%" }} onChange={this.handleInputChange} />
                                        <button className="uk-button uk-button-primary">Search</button>
                                    </MDBFormInline>
                                </MDBCol>
                            </div>
                            <h3><strong>{this.state.song.toUpperCase()}</strong></h3>
                            <MDBRow>
                                {this.state.search}
                            </MDBRow>
                        </div>
                    </div>

                    <div className="col-md-3 col-lg-2">
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
