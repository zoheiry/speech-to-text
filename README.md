## Needed to run
- mongoDb
- nodeJs

## How to run
- `npm install` or `yarn install` (I personally prefer`yarn`).
- run `cp .env.example .env` and fill in the correct env values.
- run the monogo daemon by running `mongod`.
- run the node server `yarn server` or `npm run server`.
- run the webpack server `yarn start` or `npm start`.

## Sending emails
To send emails you have to add your email and password in the .env file (see .env.example) and make sure that in your google accounts settings you have "allow less secure apps" turned on. [See the steps to that here](https://support.google.com/accounts/answer/6010255?hl=en)

## Implementation notes
Some notes about the features and technologies used to implement this app.
- User authentication using Json Web Tokens (JWT).
- bcrypt used for password hashing.
- Mongoose used as an ODM for mongo.
- Google speech to text API used to transcribe audio.
- React redux used for a centralized application state.
- Axios used for richer HTTP requests.
- styled-components for CSS in JS.
- react-mp3-recorder for recording mp3 files in the browser.
- SOX used for audio file conversion.


## Known issues
- Certain request timeout were not implemented causing some edge cases to hang.
- Poor handling of errors due to time constraints.
- Multiple audio channels not supported.
- Formats other than `mp3`, `wav`, or `flac` are not supported.
- No JWT refresh token so the user gets logged out every 10 hours.
