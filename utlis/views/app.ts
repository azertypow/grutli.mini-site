const FRAME_RATE = 60

const VIDEO_PAUSE_FRAME = [
    {time: 1, once: false},
    {time: 4, once: false},
    {time: 7, once: false},
]

// const VIDEO_PAUSE_FRAME = [
//     {time: 2, once: false},
//     {time: 3, once: false},
//     {time: 5, once: false},
//     {time: 6, once: false},
//     {time: 8, once: false},
// ]

const MIN_PAUSE_DURATION          = 1
const MAX_PAUSE_DURATION         = 5

export function getRandomPauseDuration() {
    return Math.floor(Math.random() * (MAX_PAUSE_DURATION - MIN_PAUSE_DURATION + 1)) + MIN_PAUSE_DURATION
}

export function handleTimeUpdate(htmlVideoElement: HTMLVideoElement) {
    if(htmlVideoElement.currentTime < 0.1 && VIDEO_PAUSE_FRAME.at(-1).once) {
        VIDEO_PAUSE_FRAME.forEach(value => value.once = false)
        // console.log('reset', VIDEO_PAUSE_FRAME)
    }
    const videoCurrentTime = Math.round( htmlVideoElement.currentTime)

    const matchedFrame = VIDEO_PAUSE_FRAME.find(value => {
        return value.time === videoCurrentTime
    })
    // console.log( matchedFrame )

    if ( matchedFrame && !matchedFrame.once ) {
        matchedFrame.once = true

        htmlVideoElement.pause()

        const pauseDuration = getRandomPauseDuration()

        console.log(`Pause de ${pauseDuration} secondes au time ${videoCurrentTime}`)

        setTimeout(() => {
            htmlVideoElement.play()
        }, pauseDuration * 1_000)

    }
}
