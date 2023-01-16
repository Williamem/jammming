import React from 'react';
import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify'


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: [
/*                 {name: 'name4', artist: 'artist4', album: 'album4', id: 4},
                {name: 'name5', artist: 'artist5', album: 'album5', id: 5},
                {name: 'name6', artist: 'artist6', album: 'album6', id: 6}, */
            ],
        }
    }

    addTrack(track) {
        const tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        } else {
            tracks.push(track);
        }
        this.setState({playlistTracks: tracks});
    }

    removeTrack(track) {
        const tracks = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playlistTracks: tracks});
    }

    updatePlaylistName(newPlaylistName) {
        this.setState({playlistName: newPlaylistName});
    }

    savePlaylist() {
        const URIs = this.state.playlistTracks.map(track => track.uri);
        const playlistName = this.state.playlistName;
        Spotify.savePlaylist(playlistName, URIs)
        this.setState({
            playlistName: 'New Playlist',
            playlistTracks: []
        })
        //return this.state.playlistTracks.map(track => track.uri);
    }

    async search(term) {
        const searchResults = await Spotify.search(term);
        try {
            this.setState({searchResults: searchResults})
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar
                    onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                        searchResults={this.state.searchResults}
                        onAdd={this.addTrack} />
                        <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}