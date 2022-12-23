"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
// import SpotifyWebApi from "spotify-web-api-node"
// import express from 'express'
const clientID = 'XXX';
const clientSecret = 'XXX';
const redirectURL = 'XXX';
const encodedRedirectURL = 'XXX';
const PORT = 3000;
const credentials = { clientID, clientSecret, PORT, redirectURL, encodedRedirectURL };
exports.credentials = credentials;
