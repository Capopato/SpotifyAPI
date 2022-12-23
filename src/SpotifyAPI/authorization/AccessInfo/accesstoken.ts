// import SpotifyWebApi from "spotify-web-api-node"
// import express from 'express'
const clientID: string = 'XXX'
const clientSecret: string = 'XXX'
const redirectURL: string = 'XXX'
const encodedRedirectURL: string = 'XXX'
const PORT: number = 3000

interface credentialsInterface{
    clientID: string,
    clientSecret: string,
    redirectURL: string,
    encodedRedirectURL: string,
    PORT: number
}

const credentials = {clientID, clientSecret, PORT, redirectURL, encodedRedirectURL}
export {credentials}