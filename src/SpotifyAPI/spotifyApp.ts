import SpotifyWebApi from "spotify-web-api-node";
import fs from 'fs'
import { text } from "express";

const token: string = 'XXX'
const spotifyApi: SpotifyWebApi = new SpotifyWebApi

spotifyApi.setAccessToken(token)

// Function to get the data
// Get the user ID
// With the user ID get the playlist data 

const getPlaylistInfo = async () => {
    // Get the user ID related to the accesstoken
    const userID = (await spotifyApi.getMe()).body.id
    const playlistsData = (await spotifyApi.getUserPlaylists(userID)).body.items
    const playlist: playlistOptions[] = []

    interface playlistOptions {
        Name: any,
        id: any
    }

    for (let info of playlistsData) {
        playlist.push({
            Name: info.name, 
            id: info.id})
    }

    return playlist
}

const getTrackInfo = async () => {
    const playlist = await getPlaylistInfo()

    // I want per playlist and overview of the tracks. If new playlist > create new tracklist
    interface playlistTracksOptions {
        trackname: string | undefined,
        albumName: string | undefined,
        artistName: string | undefined,
        releaseDate: string | undefined
    }

    let playlistTracks: playlistTracksOptions[] = []

    for (let info of playlist) {
        const trackInfo = (await spotifyApi.getPlaylistTracks(info.id, {
            offset: 0,
            limit: 100
        })).body.items
        for (let info of trackInfo){
            playlistTracks.push({
                trackname: info.track?.name,
                albumName: info.track?.album.name,
                artistName: info.track?.artists[0].name,
                releaseDate: info.track?.album.release_date,

            })
        }
    }
    console.log(playlistTracks)
    return playlistTracks
}

const exportTracksJSON = async () => {
    const tracks = await getTrackInfo()
    const data: string = JSON.stringify(tracks)
    fs.writeFileSync('PlaylistTracks', data)
}


exportTracksJSON()
