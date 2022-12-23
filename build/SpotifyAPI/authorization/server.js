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
const express_1 = __importDefault(require("express"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const accesstoken_1 = require("./AccessInfo/accesstoken");
// Declare instant of app and SpotifyWebApi
const app = (0, express_1.default)();
const PORT = accesstoken_1.credentials['PORT'];
const clientID = accesstoken_1.credentials['clientID'];
const clientSecret = accesstoken_1.credentials['clientSecret'];
const redirectURL = accesstoken_1.credentials['redirectURL'];
const spotifyApi = new spotify_web_api_node_1.default({
    clientId: clientID,
    clientSecret: clientSecret,
    redirectUri: redirectURL
});
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];
app.get('/', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});
app.get('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = req.query.error;
    const grandCode = req.query.code;
    if (error) {
        res.status(400).send({
            error: error,
        });
    }
    const authorization = yield spotifyApi.authorizationCodeGrant(grandCode);
    const accesToken = yield authorization.body['access_token'];
    const refreshToken = yield authorization.body['refresh_token'];
    const expiresIn = yield authorization.body['expires_in'];
    spotifyApi.setAccessToken(accesToken);
    spotifyApi.setRefreshToken(refreshToken);
    console.log(spotifyApi.getCredentials());
    res.status(200).send('Account page');
}));
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
