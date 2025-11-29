//Screen Variables//
const landingScreen = document.getElementById("landing-screen");
const permissionScreen = document.getElementById("permission-screen");
const wishScreen = document.getElementById("wish-screen");

//Button Variables//
const enterBtn = document.getElementById("enter-btn");
const makeWishBtn = document.getElementById("make-wish-btn");
const bucketBtn = document.getElementById("bucket-btn");
const anotherWishBtn = document.getElementById("another-wish-btn");
// const listenBtn = document.getElementById("listen-btn"); // test button for debugging

//variable to track recording state//
let isRecording = false;
let mic; //Tone.js microphone input//
let recorder; //Tone.js recorder//
let recordedBlob; //stores the recorded audio file//

//dont show other screens initially//
permissionScreen.style.display = "none";
wishScreen.style.display = "none";

//click enter to go to permission screen//
enterBtn.addEventListener("click", function() {
landingScreen.style.display = "none";
permissionScreen.style.display = "block";
});

//click make wish to go to wish screen//
makeWishBtn.addEventListener("click", async function() {
    //start Tone.js (required after user interaction)//
    await Tone.start();
    
    try {
        //create microphone input//
        mic = new Tone.UserMedia();
        //open the microphone//
        await mic.open();
        //create recorder and connect mic to it//
        recorder = new Tone.Recorder();
        mic.connect(recorder);
        
        //if successful go to wish screen//
        permissionScreen.style.display = "none";
        wishScreen.style.display = "block";
    } catch (error) {
        //if access denied alert user//
        alert("Microphone access is required to make a wish!");
    }
});

bucketBtn.addEventListener("click", async function() {
    if (isRecording === false) {
        //start recording//
        recorder.start();
        isRecording = true;
        bucketBtn.textContent = "Release your wish";
    } else {
        //stop recording//
       recordedBlob = await recorder.stop();
        isRecording = false;
        bucketBtn.textContent = "Wish released!";
        bucketBtn.disabled = true;
        mic.close(); 
        //send recorded audio to server//
        const formData = new FormData();
        formData.append("audio", recordedBlob, "wish.webm");
        await fetch("/upload", {
            method: "POST",
            body: formData
        });
//play all wishes after short delay//
setTimeout(async () => {
  await playAllWishes();
}, 500);
anotherWishBtn.style.display = "block";
        
        // //test playback//
        // const audioURL = URL.createObjectURL(recordedBlob);
        // const player = new Tone.Player(audioURL).toDestination();
        // player.autostart = true;
    }
});

//click to make another wish//
anotherWishBtn.addEventListener("click", async function() {
  //reset the bucket button//
  bucketBtn.textContent = "Bucket";
  bucketBtn.disabled = false;
  //hide the another wish button//
  anotherWishBtn.style.display = "none";
  //set up microphone and recorder again//
  mic = new Tone.UserMedia();
  await mic.open();
  recorder = new Tone.Recorder();
  mic.connect(recorder);
});

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