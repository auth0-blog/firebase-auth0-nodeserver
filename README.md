# Node.js Firebase + Auth0 Authentication Server

> Follow this tutorial to learn how to authenticate a Node.js server and Angular app with Cloud Firestore database using Auth0: [How to Authenticate Firebase and Angular with Auth0](https://auth0.com/blog/how-to-authenticate-firebase-and-angular-with-auth0-part-1/).

This is an implementation of a Node server that enables authentication of [Firebase](https://firebase.google.com/) after a user has logged into an app with [Auth0](https://auth0.com).

The user should log into Auth0 on the client. The client app should then call the secure `/auth/firebase` endpoint to acquire a Firebase token, which can be used to securely access Firebase real-time databases in the client app.

(The proposed use of this server is to build an app that will display dog information and allow people to comment on the dog breeds in real-time using Firebase.)

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

Download the private key JSON file from your Firebase [Service Account](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) to this project's `/firebase` folder.

Remove the `.example` extension from the `config.js.example` file and add the appropriate configuration to the file.

To start the webserver, run:

```
$ node server
```

The server will be available in the browser at `http://localhost:1337`. Accessing the `/auth/firebase` route requires an Auth0 access token, acquired and sent as an `Authorization` header (`Bearer` type) by your client application with the HTTP request.

## Endpoints

### /auth/firebase (protected)

This protected endpoint will return:

```
{
  firebaseToken: {Custom Firebase Token object}
}
```

### /api/dogs (public)

This public endpoint returns an array of the 10 most popular dogs in the US in 2016, ranked by the AKC. The data takes the following shape:

```
[
  {
    "breed": string,
    "rank": number (1-10),
    "image": string (URL to CC0 Creative Commons image)
  },
  ...
]
```

### /api/dog/:rank (protected)

This protected endpoint returns a single dog object of the `rank` specified in the request parameters. The data takes the following shape:

```
{
  "breed": string,
  "rank": number (1-10),
  "description": string,
  "personality": string,
  "energy": string,
  "group": string,
  "image": string (URL to CC0 Creative Commons image),
  "link": string (URL to AKC breed information)
}
```

## License

[MIT](LICENSE)
