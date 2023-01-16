//starts at task 74
import {clientId} from './apiKey'

let accessToken;
const redirectUri = 'http://localhost:3000/';
const baseUrl = 'https://api.spotify.com/v1'

export const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        };
        let tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            let expiresIn = Number(expiresMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        };

        if (!tokenMatch || !expiresMatch) {
            window.location.href =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        };
        //should this be here?
        return;
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = `/search?type=track&q=${term}`;
        const headers = {Authorization: `Bearer ${accessToken}`};

        try {
            const response = await fetch(baseUrl + endpoint, {headers: headers});
            if (response.ok) {
                const jsonResponse = await response.json();
                if(!jsonResponse.tracks) return [];
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
        } catch(err) {
            console.log(err);
        }
    },

    async savePlaylist(playlistName, URIs) {
        if (!playlistName || !URIs) return;
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        const endpoint = '/me';
        let userID;

        try {
            const response = await fetch(baseUrl + endpoint, {hearders: headers});
            if (response.ok) {
                const jsonResponse = response.json();
                userID = jsonResponse.id;
            }
        } catch(err) {
            console.log(err);
        }
    },
}