# The Wishing Well

An interactive audio installation where users record wishes that play back as overlapping echoes, creating a collective soundscape of anonymous hopes.

## Concept

The Wishing Well creates a shared space for anonymous wishes. When you release your wish into the well, you hear it blend with the whispers of others. Individual voices becoming indistinguishable, transforming into a chorus of collective hope.

## Features

- Record audio wishes through your browser
- Wishes are saved and played back with reverb effects
- Random selection of past wishes creates unique overlapping experiences
- Each visit to the well sounds different

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Tone.js
- **Backend:** Node.js, Express, Multer
- **Audio:** Tone.js for recording, playback, and reverb effects

## Setup

1. Clone the repository
2. Run `npm install`
3. Run `node server.js`
4. Open `http://localhost:3000` in Chrome

## Note

Works best in Chrome. Safari may have audio playback issues. Have not tested this on Microsoft Edge or Mozilla Firefox. 