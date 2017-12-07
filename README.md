# Node.js Firebase + Auth0 Authentication Server

This is an implementation of a Node server that enables authentication of [Firebase](https://firebase.google.com/) after a user has logged into an app with [Auth0](https://auth0.com).

The user should log into Auth0 on the client. The client app should then call the secure `/delegate/firebase` endpoint to acquire a Firebase token, which can be used to securely access Firebase real-time databases in the client app.

## Dependencies

You must have:

* [Node.js and npm](https://nodejs.org) installed
* An [Auth0](https://auth0.com) account with a [Client app](https://manage.auth0.com/#/clients)
* An [Auth0 API](https://manage.auth0.com/#/apis) with a name, identifier `http://localhost:1337/`, and algorithm `RS256`
* A [client-facing application](https://auth0.com/docs/quickstarts) where users can log in with Auth0
* A [Firebase project](https://console.firebase.google.com/u/0/) with [security enabled](https://firebase.google.com/docs/database/security/quickstart#sample-rules) for Real-Time Database
* A [Service Account](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) for your Firebase project with a **private key** generated (should download as a `.json` file)

## Setup

Clone this repository and run:

```
$ npm install
```

Download the private key JSON file from your Firebase [Service Account](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) to the server folder.

Remove the `.example` extension from the `config.js.example` file and add the appropriate configuration to the file.

To start the webserver, run:

```
$ node server
```

The server will be available in the browser at `http://localhost:1337`. Accessing the `/delegate/firebase` route requires an Auth0 access token.

## License

[MIT](LICENSE)