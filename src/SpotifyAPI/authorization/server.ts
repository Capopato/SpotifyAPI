import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import { credentials } from './AccessInfo/accesstoken'

// Declare instant of app and SpotifyWebApi
const app: express.Application | undefined  = express() 
const PORT: number = credentials['PORT']
const clientID: string = credentials['clientID']
const clientSecret: string = credentials['clientSecret']
const redirectURL: string = credentials['redirectURL']

const spotifyApi: SpotifyWebApi | undefined  = new SpotifyWebApi({
    clientId: clientID, 
    clientSecret: clientSecret, 
    redirectUri: redirectURL
})

const scopes: string[] = [
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
] 

app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes))
})

app.get('/account', async (req: express.Request, res: express.Response) => {
    const error = req.query.error
    const grandCode = req.query.code
    if (error) {
        res.status(400).send({
            error: error,
        })
    }
    const authorization = await spotifyApi.authorizationCodeGrant(grandCode)
    const accesToken: string = await authorization.body['access_token']
    const refreshToken: string = await authorization.body['refresh_token']
    const expiresIn: number = await authorization.body['expires_in']

    spotifyApi.setAccessToken(accesToken)
    spotifyApi.setRefreshToken(refreshToken)

    console.log(spotifyApi.getCredentials())
    res.status(200).send('Account page')
})

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))
