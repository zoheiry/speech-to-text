## Implementation notes
Some notes about the features and technologies used to implement this app.
- User authentication using Json Web Tokens (JWT).
- Mongoose used as an ODM for mongo.
- React redux used for a centralized application state (This is certainly overkill for such a small app.)
- Axios used for richer HTTP requests.
- styled-components for CSS in JS.


## Needed to run
- mongo
- node
- Sox

## How to run
- `npm install` or `yarn install` (I personally prefer`yarn`).
- run the monogo daemon by running `mongod`.
- run the node server `node server/app.js`.
- run the webpack server `npm start` or `yarn start`.
