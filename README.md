# The Wishing Well

An interactive audio installation where users record wishes that play back as overlapping echoes, creating a collective soundscape of anonymous hopes.

**Live Project:** [The Wishing Well](https://connectionslab-final-wishing-well-production.up.railway.app/)

**Documentation:** [Full Project Write-up](https://www.abarbayianis.com/post/the-wishing-well-final-project-documentation)

---

## Concept

The Wishing Well creates a shared space for anonymous wishes. When you release your wish into the well, you hear it blend with the whispers of others. Individual voices becoming indistinguishable, transforming into a chorus of collective hope.

This project draws inspiration from the [1937 Snow White wishing well scene](https://youtu.be/qwBWZ3z1I6w) - that intimate, confessional moment where Snow White sings for herself while simultaneously releasing something into the universe. The goal was to capture that same childlike, dreamy vulnerability.

---

## Features

- **Record audio wishes** through your browser
- **Wishes are saved** and played back with reverb effects
- **Random selection** of past wishes creates unique overlapping experiences
- **Gradual audio blending** - your voice starts clear, then dissolves into the collective chorus
- **Interactive soundscape** - each visit to the well sounds different
- **Responsive design** - works across desktop, tablet, and mobile devices

---

## Tech Stack

**Frontend:**
- HTML, CSS, JavaScript
- Tone.js for all audio functionality
- CSS animations for whimsical visual effects
- Responsive design with media queries

**Backend:**
- Node.js with Express framework
- Multer for file upload handling
- Audio file storage system

**Audio:**
- Tone.js for recording, playback, and reverb effects
- Custom synthesizers (MetalSynth, MembraneSynth) for coin drop and water splash sounds
- Gradual reverb ramping for audio blending

**Deployment:**
- Railway with automatic GitHub integration

---

## Setup

### Local Development

1. Clone the repository
```bash
git clone https://github.com/barbajohnz/ConnectionsLab-Final-Wishing-Well.git
cd ConnectionsLab-Final-Wishing-Well
```

2. Install dependencies
```bash
npm install
```

3. Run the server
```bash
node server.js
```

4. Open in your browser
```
http://localhost:3000
```

### Deployment
The project auto-deploys to Railway when changes are pushed to the main branch on GitHub.

---

## How It Works

1. **Landing Screen** - Cloud curtains animate apart, revealing the forest
2. **Permission Screen** - Request microphone access through a whimsical wooden sign
3. **Wish Screen** - Interactive coin drops into the well to trigger recording
4. **Listening Screen** - Your wish is saved and played back with:
   - Clear initial playback (dry signal)
   - Gradual reverb increase using Tone.js `rampTo()` method
   - Staggered timing with other wishes (2-3 second offsets)
   - Random selection of 3-5 previous wishes for layering

---

## Major Challenges Solved

### Responsive Design
Originally built for 1920x1080 desktop. User testing revealed chaos on other screens. Solution: Manually tested and adjusted every asset for three screen sizes (desktop, tablet, mobile) using DevTools, then organized into structured media queries.

### Audio Overlap Management
Getting multiple recordings to play simultaneously without becoming cacophony. Solution: Staggered timing + gradual reverb increases. Each wish starts clear, then slowly blends while previous wishes are already reverbed.

### Browser Autoplay Restrictions
Browsers block autoplay without user interaction. Solution: All audio functionality requires an initial click/interaction to initialize the audio context.

---

## Future Enhancements

### Physical Installation
- **Arduino integration** - Use actual touch sensors and physical coins instead of screen clicks
- **Gallery installation** - Large screen display with headphones in contemplative space
- **Offline version** - Standalone installation independent of web infrastructure

### Audio Improvements
- **Ambient forest sounds** - Background atmosphere (wind, crickets, leaves)
- **Advanced layering** - Experiment with spatial audio and varied reverb styles
- **Listen-only mode** - Let users experience the soundscape without recording

### User Experience
- **Fix listening screen timing** - Delay prompts until audio fully completes
- **Continuous ripple animations** - Visual feedback that persists longer

---

## Browser Compatibility

**Best experience:** Google Chrome

**Known issues:**
- Safari may have audio playback issues
- Not tested on Microsoft Edge or Mozilla Firefox

---

## Resources & References

### Core Audio Library

**Tone.js (Web Audio Framework)**
- [Official Documentation](https://tonejs.github.io/)
- [GitHub Repository](https://github.com/Tonejs/Tone.js)
- [Interactive Examples](https://tonejs.github.io/examples/)
- [Wiki & Tutorials](https://github.com/Tonejs/Tone.js/wiki)

**Specific Tone.js Features:**
- [Tone.UserMedia](https://tonejs.github.io/docs/latest/classes/UserMedia) - microphone access
- [Tone.Recorder](https://tonejs.github.io/docs/latest/classes/Recorder) - audio recording
- [Tone.Player](https://tonejs.github.io/docs/latest/classes/Player) - audio playback
- [Tone.Reverb](https://tonejs.github.io/docs/latest/classes/Reverb) - reverb effects
- [Signal Ramping (rampTo)](https://tonejs.github.io/examples/rampTo) - gradual parameter changes
- [Param Documentation](https://tonejs.github.io/docs/14.7.38/Param)
- [Effects (wet/dry control)](https://github.com/Tonejs/Tone.js/wiki/Effects)

**Synthesizers:**
- [Tone.MetalSynth](https://tonejs.github.io/docs/latest/classes/MetalSynth) - coin clink sound
- [Tone.MembraneSynth](https://tonejs.github.io/docs/15.0.4/classes/MembraneSynth.html) - water splash
- [Tone.FMSynth](https://tonejs.github.io/docs/14.9.17/classes/Synth.html) - ambient drone

**Audio Processing:**
- [Tone.Filter](https://tonejs.github.io/docs/r13/Filter) - lowpass filtering
- [Signals Overview](https://github.com/Tonejs/Tone.js/wiki/Signals)
- [Tone.js Glossary](https://github.com/Tonejs/Tone.js/wiki/Glossary)

### Backend & Server

**Express.js (Node.js Framework)**
- [Official Documentation](https://expressjs.com/)
- [Getting Started Guide](https://expressjs.com/en/starter/hello-world.html)
- [Serving Static Files](https://expressjs.com/en/starter/static-files.html)
- [Routing Guide](https://expressjs.com/en/guide/routing.html)

**Multer (File Upload Middleware)**
- [NPM Package](https://www.npmjs.com/package/multer)
- [GitHub Repository](https://github.com/expressjs/multer)

### Deployment

**Railway (Cloud Platform)**
- [Official Site](https://railway.app/)
- [Documentation](https://docs.railway.app/)
- [GitHub Integration](https://docs.railway.app/deploy/deployments)

### Web APIs & Browser Features
- [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) - file upload handling
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - HTTP requests
- [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) - blob handling
- [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) - element positioning
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - underlying browser audio

### CSS & Animation
- [CSS Keyframes Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [CSS Animations Tutorial](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
- [Transform Property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [Position Property](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### JavaScript Techniques
- [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - asynchronous programming
- [Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) - timing control

### Typography
- [Google Fonts](https://fonts.google.com/)
  - Rubik Bubbles - whimsical cloud title font
  - Fredericka the Great - wooden sign aesthetic

---

## Credits

**Developed by:** Alexandros Barbayianis  
**Course:** NYU IMA Low Res Connections Lab (Fall 2025)  
**Assets:** Adobe Stock (forest elements, well, clouds)  
**Sound Effects:** Adobe Sound Library (coin drop, water splash)  
**Fonts:** Google Fonts (Rubik Bubbles, Fredericka the Great)

---

## License

This project is for educational purposes as part of NYU ITP/IMA coursework.
