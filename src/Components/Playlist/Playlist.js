import React from "react";
import './Playlist.css';

import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
    render() {
        return (
            <div class="Playlist">
            <input defaultValue={'New Playlist'}/>
            <TrackList
            tracks={this.props.playlistTracks}
            onRemove={this.props.onRemove}
            isRemoval={true} />
            <button class="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
        );
    }
}