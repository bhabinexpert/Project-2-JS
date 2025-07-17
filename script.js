const video = document.getElementById('video')
const videoThumbnail = document.getElementById('video-thumbnail')

const playpause = document.getElementById('play-pause')
const frwd = document.getElementById('skip-10')
const bkwrd = document.getElementById('skipminus-10')
const volume = document.getElementById('volume')

const muteBtn = document.querySelector('.mute')
const videoContainer = document.querySelector('.videoContainer')
const controls = document.querySelector('.controls')
const progressBar = document.querySelector('.progress-bar')
const playbackLine = document.querySelector('.playback-line')

const currentTimeRef = document.getElementById('current-time')
const maxDuration = document.getElementById('max-duration')
const fullScreenBtn = document.getElementById('fullscreen-btn')

playpause.addEventListener('click', function(){
    if(video.paused){
        videoThumbnail.style.display = "none"
        video.play()
        playpause.innerHTML = '<i class="fa-solid fa-pause"></i>'
    }else{
        video.pause()
        playpause.innerHTML ='<i class="fa-solid fa-play"></i>'
    }
})
let isPlaying = false

function togglePlayPause(){
    if(isPlaying){
        video.pause()
        playpause.innerHTML = '<i class="fa-solid fa-play"></i>'
    }else{
        videoThumbnail.style.display = "none"
        video.play()
        playpause.innerHTML = '<i class="fa-solid fa-pause"></i>'
    }
    isPlaying = !isPlaying
}

document.addEventListener('keydown', function(event){
    if(event.key === " "){
        event.preventDefault()
        togglePlayPause()  
    }
})

video.addEventListener("play",function(){
    isPlaying = true
})

video.addEventListener("pause", function(){
    isPlaying = false
})

video.addEventListener("ended", function(){
    playpause.innerHTML = '<i class="fa-solid fa-play"></i>'
})

frwd.addEventListener('click', function(){
    video.currentTime +=5 //default function from video tag
})

bkwrd.addEventListener('click', function(){
    video.currentTime -=5 //default function from video tag
})

muteBtn.addEventListener('click',function(){
    if(video.muted){
        video.muted = false

        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
        volume.value = video.volume
    }else{
        video.muted = true
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
        volume.value = 0

    }
})

document.addEventListener('keydown', function(e){
    if(e.key === "M" || e.key === "m") {
        e.preventDefault();
        if(video.muted){
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volume.value = video.volume;
        } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            volume.value = 0;
        }
    }
});

volume.addEventListener('input', function(){
    video.volume = volume.value

    if (video.volume == 0){
        muteBtn.innerHTML =  '<i class="fa-solid fa-volume-xmark"></i>'
    }
    else{
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    }
})

videoContainer.addEventListener("mouseleave",()=>{
    if(!isPlaying) return
    controls.style.opacity = 0
})
videoContainer.addEventListener("mouseenter",()=>{
    
    controls.style.opacity = 1
})


video.addEventListener("timeupdate", ()=>{
    const currentTime = video.currentTime
    const duration = video.duration
    const percentage = (currentTime/duration) * 100
    progressBar.style.width = percentage + "%"
})

function showThumbnail(){
    videoThumbnail.style.display = "block"
}

video.addEventListener("ended", ()=>{
    progressBar.style.width = "0%"
    showThumbnail()
})


const timeFormatter = (timeInput)=>{
    let  minute = Math.floor(timeInput/60)
    minute = minute <10 ? "0" + minute : minute

    let  second = Math.floor(timeInput%60)
    second = second <10? "0" + second :second

    return `${minute}:${second}`


}
setInterval(()=>{
    currentTimeRef.innerHTML = timeFormatter(video.currentTime)
    maxDuration.innerHTML = timeFormatter(video.duration)
}, 250)

playbackLine.addEventListener("click",(e)=>{
    let timelineWidth = playbackLine.clientWidth
    video.currentTime = (e.offsetX / timelineWidth)*video.duration
})

function updateVolumeBackground(){
    const percent = (volume.value - volume.min) / (volume.max - volume.min) * 100;
    volume.style.setProperty('--value', `${percent}%`);
}

volume.addEventListener('input', updateVolumeBackground)
updateVolumeBackground()

fullScreenBtn.addEventListener('click',()=>{
  
    if(!document.fullscreenElement){
        videoContainer.requestFullscreen().catch((err)=>{
            alert(`ERROR attempting to enable the full-screen mode: ${err.message} (${err.name})`)
        })
        fullScreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>'
    }
    else{
        document.exitFullscreen()
        fullScreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>'
    }
})