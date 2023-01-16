import React from "react";
import './Playlist.css';

import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChane = this.handleNameChane.bind(this);
    }

    handleNameChane(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
            <input defaultValue={'New Playlist'}
            onChange={this.handleNameChane} />
            <TrackList
            tracks={this.props.playlistTracks}
            onRemove={this.props.onRemove}
            isRemoval={true} />
            <button
            className="Playlist-save"
            onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
        );
    }
}