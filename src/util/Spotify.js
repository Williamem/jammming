//starts at task 74
import {clientId} from './apiKey'

let accessToken;
const redirectUri = 'http://localhost:3000/';

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
            //part of the borrowed code, put back in neccesary
            //return accessToken;
        }

        if (!tokenMatch || !expiresMatch) {
            window.location.href =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
        //should this be here?
        return;
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken;
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`
        //below mig be one too few objects???
        const headers = {headers: {Authorization: `Bearer ${accessToken}`}};

        try {
            const response = await fetch(endpoint, headers);
            if (response.ok) {
                const jsonResponse = await response.json();
                jsonResponse.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
        } catch(error) {
            console.log(error);
        }
    },
}