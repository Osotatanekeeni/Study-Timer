// SCRIPT FOR THE TIMER

// The data/time we want to countdown to
var countDownDate = new Date("Jan 1, 2022 00:00:00").getTime();

var audio = new Audio('WizKid - Joro (Official Video) (256  kbps).mp3');
    
var person = window.prompt("What's your name?");

if (person != null) {
    document.getElementById("user-name").innerHTML = person + "'s Productivity Timer";
} else {
    document.getElementById("user-name").innerHTML = "Productivity Timer"
}

// Run myfunc every second
var myfunc = setInterval(function() {

    
    var now = new Date().getTime();
    //var user_time = new Date(document.querySelector("user-time")).getTime();
    var timeleft = countDownDate - now;
    //var timeleft = user-time - now;
        
    // Calculating the days, hours, minutes and seconds left
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
    document.getElementById("days").innerHTML = days + "d "
    document.getElementById("hours").innerHTML = hours + "h " 
    document.getElementById("minutes").innerHTML = minutes + "m " 
    document.getElementById("seconds").innerHTML = seconds + "s " 
        
    
    // Display the message when countdown is over
    if (timeleft < 0) {
        clearInterval(myfunc);
        audio.play();
        document.getElementById("days").innerHTML = ""
        document.getElementById("hours").innerHTML = "" 
        document.getElementById("minutes").innerHTML = ""
        document.getElementById("seconds").innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP"
    }
}, 1000);

// SCRIPT FOR THE MUSIC PLAYER
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let prev_btn = document.querySelector(".prev-track");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

//Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks to be played
// (Music gotten from https://freemp3cloud.com/)
let track_list  = [
    {
        name: "1 Milli",
        artist: "Davido",
        image: "https://cdn.auth0.com/blog/stockimages/thief-2.jpeg",
        //path: "Davido - The Best Official Audio ft Mayorkun.mp3"
        path: "https://cdnm.meln.top/mr/Davido%20-%201%20Milli.mp3?session_key=ee18e2362abe07b24adbb75c0cd034e9&hash=6033c82eec654683372343b3303502cf"
       
    },
    {
        name: "Risky",
        artist: "Davido",
        image: "https://cdn.auth0.com/blog/stockimages/thief-2.jpeg",
        path: "https://cdnm.meln.top/mx/Davido,%20Popcaan%20-%20Risky.mp3?hash=NDc0NDk5MTIzLzQ1NjM5MTgyOS5tcDM=" 
     },

     {
         name: "All You Need To Know",
         artist: "Gryffin",
         image: "https://source.unsplash.com/Qrspubmx6kE/640x360",
         path: "https://cdnm.meln.top/mx/Gryffin,%20SLANDER%20feat.%20Calle%20Lehmann%20-%20All%20You%20Need%20To%20Know.mp3?hash=NDc0NDk5MTU4LzQ1NjM1NzUxMi5tcDM="
     },

     {
         name: "Tusa",
         artist: "Karol G, Nicki Minaj",
         image: "https://cdn.auth0.com/blog/stockimages/thief-2.jpeg",
         path: "https://cdnm.meln.top/mr/KAROL%20G%20&%20Nicki%20Minaj%20-%20Tusa.mp3?session_key=6dbf214f4ff42c72547fa5cd57239a75&hash=1efe3f724f7ba875efedaed60a224c83"
     },

     {
        name: "Play",
        artist: "Alan Walker",
        image: "https://source.unsplash.com/Qrspubmx6kE/640x360",
        path: "https://cdnm.meln.top/mr/K-391,%20Alan%20Walker,%20Tungevaag%20feat.%20Mangoo%20-%20Play.mp3?session_key=dd7f5d4cd83e831a91dd6e724a73e7cc&hash=4404121296570064e9682cb31ce33529" 
     },

     {
        name: "Little More (Royaly)",
        artist: "Chris Brown",
        image: "https://cdn.auth0.com/blog/stockimages/thief-2.jpeg",
        path: "https://cdnm.meln.top/mr/Chris%20Brown%20-%20Little%20More%20(Royalty).mp3?session_key=b9a629f504999dda41fbe272e30bf08d&hash=b77132661471a2a84bfc42b867085ee5"
     }
];

function loadTrack(track_index) {
    //Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues()

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")"
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    // Set interval of 1000ms for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000)

    // Move to the next track if the current finishes playing
    //using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);

    // Apply a random background color
    random_bg_color();
}

function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    //Set the background color to the new color
    document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    // Switch between playing and pausing depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack()
}

function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;

    // Replace the icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    // Go back to the first track if the current
    // one is the last in the track list
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Go back to the last track if the current
    // one is the first in the track list
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length;
    }

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the percentage
    // of the the seek slider and get the relative
    // duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);

    //Set the current track position to the calculated
    //seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    //Set the volume according to the percentage
    //of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    //Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60); 
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
        // Add a zero to the single digit time values 
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
  
        // Display the updated duration 
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//Load the first track in the tracklist
loadTrack(track_index)
