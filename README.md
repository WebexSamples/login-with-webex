# Login with Webex Samples

This repository contains samples for logging in with Webex Platorm using Open ID Connect, known as "Login with Webex".

## Documentation

Login with Webex lets users login to your app or service using their Webex account. Login with Webex is based on OpenID Connect, an identity layer built on the OAuth 2.0 protocol. Standard Webex Integrations use OAuth flows to obtain access tokens for making API calls on a user's behalf. Login with Webex uses those same flows, with some additional parameters, to obtain ID tokens. ID tokens are signed, Base64-encoded JSON Web Tokens (JWTs) that act as proof a user authenticated with Webex, and that contain information ("claims") about the authenticated user, such as their email or name.

https://developer.webex.com/docs/login-with-webex

## Try It Out

Try it out by chosing one of the available flows: https://webexsamples.github.io/login-with-webex

To start the server run:

`npm start`

Optional parameters are:
- `WEBEX_BASE=https://integration.webexapis.com`
- `SCOPES='spark:kms'`
- `CLIENT_ID='example'` Note: create a new integration app to get a client id from the webex developer portal

For example:
`PORT=4000 WEBEX_BASE=https://integration.webexapis.com SCOPES='spark:kms' CLIENT_ID=example npm start`

## Don't be a Stranger

- https://developer.webex.com/docs
- https://developer.webex.com/blog
- https://developer.webex.com/support
- @WebexDevs: https://twitter.com/webexdevs

Made with <3 by the Webex Developer Evangelism & Engineering Teams at Cisco
