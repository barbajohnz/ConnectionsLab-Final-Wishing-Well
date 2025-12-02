//Screen Variables//
const landingScreen = document.getElementById("landing-screen");
const permissionScreen = document.getElementById("permission-screen");

//Button Variables//
const enterBtn = document.getElementById("enter-btn-img");
const makeWishBtn = document.getElementById("make-wish-btn");
const coinBtn = document.getElementById("coin-btn");
// const listenBtn = document.getElementById("listen-btn"); // test button for debugging

//WISH SCREEN AUDIO VARIABLES//
let warmDrone;
let droneFilter;
let sparkle;
let isDroneStarted = false;

//variable to track recording state//
let isRecording = false;
let mic; //Tone.js microphone input//
let recorder; //Tone.js recorder//
let recordedBlob; //stores the recorded audio file//

//function to start the warm drone sound on wish screen//
async function startWishAudio() {
console.log("startWishAudio called");
  if (isDroneStarted) return; //only start once
  
  await Tone.start();
  console.log("Tone started");
  isDroneStarted = true;
  
  //create a lowpass filter - starts muffled/warm//
  droneFilter = new Tone.Filter({
    frequency: 300,
    type: "lowpass",
    rolloff: -24
  }).toDestination();
  
  //create warm drone using FM synthesis//
  warmDrone = new Tone.FMSynth({
    harmonicity: 2,
    modulationIndex: 1,
    oscillator: { type: "sine" },
    modulation: { type: "sine" },
    envelope: {
      attack: 2,
      decay: 0.5,
      sustain: 0.8,
      release: 2
    },
    volume: -12  //increased from -20
  }).connect(droneFilter);
  
  //start a continuous low note//
  warmDrone.triggerAttack("C2");
  console.log("Drone should be playing");
}

//function to calculate distance between mouse and button//
function calculateMouseDistance(mouseX, mouseY, button) {
  const rect = button.getBoundingClientRect();
  const buttonCenterX = rect.left + rect.width / 2;
  const buttonCenterY = rect.top + rect.height / 2;
  
  //find the gap between mouse and button//
  const gapX = mouseX - buttonCenterX;
  const gapY = mouseY - buttonCenterY;
  
  //use Pythagorean theorem to get distance//
  const distance = Math.sqrt(gapX * gapX + gapY * gapY);

  //send the distance back//
  return distance;
}

//function to play coin splash sound//
function playCoinSplash() {
  //metallic "clink" of coin - like a small bell//
  const coin = new Tone.MetalSynth({
    frequency: 400,
    envelope: {
      attack: 0.001,
      decay: 0.4,
      release: 0.2
    },
    harmonicity: 8,
    modulationIndex: 16,
    resonance: 2000,
    octaves: 1,
    volume: -20
  }).toDestination();
  
  //water "plop" sound using membrane synth//
  const splash = new Tone.MembraneSynth({
    pitchDecay: 0.08,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.001,
      decay: 0.5,
      sustain: 0,
      release: 0.5
    },
    volume: -15
  }).toDestination();
  
  //play coin clink//
  coin.triggerAttackRelease("C6", "32n");
  
  //play splash slightly after (coin hits water)//
  setTimeout(() => {
    splash.triggerAttackRelease("G1", "8n");
  }, 100);
}

//dont show other screens initially//
permissionScreen.style.display = "none";


//click enter to go to permission screen//
enterBtn.addEventListener("click", function() {
    //fade out text first//
    document.querySelector(".title-welcome").classList.add("animate-fade");
    document.querySelector(".title-tothe").classList.add("animate-fade");
    
    //delay cloud animations until text fades//
    setTimeout(function() {
        //add animation classes to each cloud//
        document.querySelector(".cloud-topleft").classList.add("animate-left");
        document.querySelector(".cloud-topright").classList.add("animate-right");
        document.querySelector(".cloud-midleft").classList.add("animate-left");
        document.querySelector(".cloud-midright").classList.add("animate-right");
        document.querySelector(".cloud-btmleft").classList.add("animate-left");
        document.querySelector(".cloud-btmright").classList.add("animate-right");
        document.querySelector(".cloud-topcenter").classList.add("animate-up");
        document.querySelector(".cloud-midbtm").classList.add("animate-down");
        document.querySelector(".cloud-moon").classList.add("animate-fade");
    }, 1000);
    
    //wait for all animations to finish, then switch screens//
    setTimeout(function() {
        landingScreen.style.display = "none";
        permissionScreen.style.display = "block";
         // Animate sign in after a short delay
    setTimeout(function() {
        document.querySelector(".sign-container").classList.add("sign-animate-in");
    }, 500);
    }, 3000);
});

//click make wish to go to wish screen//
makeWishBtn.addEventListener("click", async function() {
      // pop the bubble button
    makeWishBtn.classList.add("bubble-pop");
    //start Tone.js 
    await Tone.start();

    // class to permission screen triggers ALL tree animations
    setTimeout(function() {
        permissionScreen.classList.add("trees-exit");
    }, 400);

    //after animations finsih switch screens
    setTimeout(async function() {
    try {
        //create microphone input
        mic = new Tone.UserMedia();
        //open the microphone//
        await mic.open();
        //create recorder and connect mic to it//
        recorder = new Tone.Recorder();
        mic.connect(recorder);
        
//show wish assets (stay on same screen)
        document.querySelector(".wish-assets").style.display = "block";
        //trigger entrance animations
        document.querySelector(".wish-assets").classList.add("wish-assets-enter");

        //show wish assets (stay on same screen)
        document.querySelector(".wish-assets").style.display = "block";
        //trigger entrance animations
        document.querySelector(".wish-assets").classList.add("wish-assets-enter");

//        //clear coin animation after it enters (2s delay + 0.8s animation)
// setTimeout(function() {
//     coinBtn.style.animation = "none";
//     coinBtn.style.opacity = "1";
// }, 3000);
    } catch (error) {
        //if access denied alert user//
        alert("Microphone access is required to make a wish!");
    }
  }, 3000);
});


coinBtn.addEventListener("click", async function() {
    if (isRecording === false) {
        //start recording//
        recorder.start();
        isRecording = true;
       //visual feedback - coin glows while recording
        coinBtn.style.filter = "drop-shadow(0 0 30px rgba(255, 0, 0, 0.8))";
    } else {
        //stop recording//
       recordedBlob = await recorder.stop();
        isRecording = false;
        //remove glow
coinBtn.style.filter = "none";

//maybe i use this? animation to move coin after wish released
// //coin falls into well
// coinBtn.classList.add("coin-exit");

//play coin splash sound
playCoinSplash();
        mic.close(); 
        
        //send recorded audio to server//
        const formData = new FormData();
        formData.append("audio", recordedBlob, "wish.webm");
        await fetch("/upload", {
            method: "POST",
            body: formData
        });

//play MY wish immediately (starts clear fades to wet)
await playMyWish(recordedBlob);

//play chorus of other wishes after 2 seconds//
setTimeout(async () => {
  await playAllWishes();
}, 2000);

// COME BAKC TO THIS? COIN ANIMATION ?//bring coin back after audio finishes (about 8 seconds total)
// setTimeout(async function() {
//     //reset coin position off-screen and make visible
//     coinBtn.classList.remove("coin-exit");
//     coinBtn.style.transform = "translateY(-300%)";
//     coinBtn.style.opacity = "1";
    
//     //small delay then animate down
//     setTimeout(function() {
//         coinBtn.style.transition = "transform 0.8s ease-out";
//         coinBtn.style.transform = "translateY(0)";
//     }, 50);
    
//     //re-enable clicking after animation finishes
//     setTimeout(async function() {
//         coinBtn.style.transition = "";
//         isRecording = false;
        
//         //re-setup mic and recorder for next wish
//         mic = new Tone.UserMedia();
//         await mic.open();
//         recorder = new Tone.Recorder();
//         mic.connect(recorder);
//     }, 900);
// }, 8000);

// anotherWishBtn.style.display = "block";
        
        // //test playback//
        // const audioURL = URL.createObjectURL(recordedBlob);
        // const player = new Tone.Player(audioURL).toDestination();
        // player.autostart = true;
    }
});

//click to make another wish//
// anotherWishBtn.addEventListener("click", async function() {
//   //reset the bucket button//
//   bucketBtn.textContent = "Bucket";
//   bucketBtn.disabled = false;
//   //hide the another wish button//
//   anotherWishBtn.style.display = "none";
//   //set up microphone and recorder again//
//   mic = new Tone.UserMedia();
//   await mic.open();
//   recorder = new Tone.Recorder();
//   mic.connect(recorder);
// });

//function to play users wish with reverb that fades from clear to wet//
async function playMyWish(blob) {
  //create reverb for users wish starts mostly dry//
  const myReverb = new Tone.Reverb({
    decay: 4,
    wet: 0.1  //start clear 10% reverb
  }).toDestination();
  await myReverb.generate();
  
  //create audio url from recorded blob//
  const audioURL = URL.createObjectURL(blob);
  
  //create player and connect to reverb//
  const player = new Tone.Player({
    url: audioURL,
    onload: () => {
      //get the duration of the wish//
      const duration = player.buffer.duration;
      console.log("My wish duration:", duration);
      
      //calculate fade time - 4 seconds max, or full duration if shorter//
      const fadeTime = Math.min(duration, 4);
      
      //ramp reverb from clear (0.1) to wet (0.6) over fade time//
      myReverb.wet.rampTo(0.6, fadeTime);
      
      //start playing//
      player.start();
    }
  }).connect(myReverb);
}

//function to play all wishes overlapping//
async function playAllWishes() {
  //fetch list of wish files from server//
  const response = await fetch("/wishes");
  const files = await response.json();
  
  //shuffle the files randomly//
  const shuffled = files.sort(() => Math.random() - 0.5);
  //pick up to 5 random wishes//
  const selected = shuffled.slice(0, 5);
  console.log("Playing wishes:", selected);
  
  //create reverb effect for well echo//
  const reverb = new Tone.Reverb({
    decay: 4,
    wet: 0.6
  }).toDestination();
  await reverb.generate();
  
  //play each wish with random delay for overlap effect//
  for (const filename of selected) {
    const url = `/wishes-audio/${filename}`;
    console.log("Loading:", url);
    const player = new Tone.Player({
      url: url,
      onload: () => {
        console.log("Loaded successfully:", filename);
        player.start();
      },
      onerror: (err) => {
        console.log("Error loading:", filename, err);
      }
    }).connect(reverb);
  }
}

// TEST FEATURE FOR DEBUGGING//click to listen to all wishes//
// listenBtn.addEventListener("click", async function() {
//   await playAllWishes();
// });