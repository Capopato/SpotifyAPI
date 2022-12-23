"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const fs_1 = __importDefault(require("fs"));
const token = 'XXX';
const spotifyApi = new spotify_web_api_node_1.default;
spotifyApi.setAccessToken(token);
// Function to get the data
// Get the user ID
// With the user ID get the playlist data 
const getPlaylistInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get the user ID related to the accesstoken
    const userID = (yield spotifyApi.getMe()).body.id;
    const playlistsData = (yield spotifyApi.getUserPlaylists(userID)).body.items;
    const playlist = [];
    for (let info of playlistsData) {
        playlist.push({
            Name: info.name,
            id: info.id
        });
    }
    return playlist;
});
const getTrackInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const playlist = yield getPlaylistInfo();
    let playlistTracks = [];
    for (let info of playlist) {
        const trackInfo = (yield spotifyApi.getPlaylistTracks(info.id, {
            offset: 0,
            limit: 100
        })).body.items;
        for (let info of trackInfo) {
            playlistTracks.push({
                trackname: (_a = info.track) === null || _a === void 0 ? void 0 : _a.name,
                albumName: (_b = info.track) === null || _b === void 0 ? void 0 : _b.album.name,
                artistName: (_c = info.track) === null || _c === void 0 ? void 0 : _c.artists[0].name,
                releaseDate: (_d = info.track) === null || _d === void 0 ? void 0 : _d.album.release_date,
            });
        }
    }
    console.log(playlistTracks);
    return playlistTracks;
});
const exportTracksJSON = () => __awaiter(void 0, void 0, void 0, function* () {
    const tracks = yield getTrackInfo();
    const data = JSON.stringify(tracks);
    fs_1.default.writeFileSync('PlaylistTracks', data);
});
exportTracksJSON();
