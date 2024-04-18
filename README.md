# Noodle, the new event scheduling tool

A work in progress. Scheduling events should be easy, respect your (and your guests') privacy, and ad-free.

Made with React, Firebase Real-time Database, React Router, and Bootstrap.

## Development

Clone repo, run `npm install`, then `npm start`. Then EITHER:

- get an .env file from Rachel to access the prod database (no longer recommended), then comment out lines 30-32 in firebase/index.js, OR:
- Install Firebase locally following [these instructions](https://firebase.google.com/docs/emulator-suite/install_and_configure). Get the `database.rules.json` file from Rachel. Start the database with `firebase emulators:start`, then proceed as usual.  
