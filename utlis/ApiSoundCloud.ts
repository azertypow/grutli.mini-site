export type ApiSoundCloud = {
    Widget: {
        /**
         * @param iframeElement frameElement ou iframeElementID
         */
        (iframeElement: HTMLIFrameElement | string): ApiSoundCloud_Widget

        Events: ApiSoundCloud_Events
    }
}

export type ApiSoundCloud_Event = {}

export type ApiSoundCloud_Events = {
    /** fired periodically while the sound is loading.*/
    LOAD_PROGRESS: ApiSoundCloud_Event

    /** fired periodically while the sound is playing.*/
    PLAY_PROGRESS: ApiSoundCloud_Event

    /** fired when the sound begins to play.*/
    PLAY: ApiSoundCloud_Event

    /** fired when the sound pauses.*/
    PAUSE: ApiSoundCloud_Event

    /** fired when the sound finishes.*/
    FINISH: ApiSoundCloud_Event

    /** fired when the user seeks.*/
    SEEK: ApiSoundCloud_Event

    // Audio events return an object containing the following properties:
    // relativePosition - relative current position of the current sound, in the range of [0,1].
    // loadProgress     - the current value of the loading progress, in the range of [0,1].
    // currentPosition  - the position of the current sound (in milliseconds).

    // UI: unknown

    /** fired when the widget has loaded its data and is ready to accept external calls.*/
    READY: ApiSoundCloud_Event

    /** Fired when the user clicks the download button.*/
    CLICK_DOWNLOAD: ApiSoundCloud_Event

    /** Fired when the user clicks the buy button.*/
    CLICK_BUY: ApiSoundCloud_Event

    /** Fired when the share panel is opened. This happens when the user clicks the "Share" button, and at the end of the last sound.*/
    OPEN_SHARE_PANEL: ApiSoundCloud_Event

    /** Fired when an error message is displayed.*/
    ERROR: ApiSoundCloud_Event
}

export type ApiSoundCloud_Widget = {

    //*****
    // METHODS
    //*****

    /** adds a listener function for the specified eventName. See below for the list of possible event names. */
    bind: (eventName: ApiSoundCloud_Event, listener: () => void) => void

    /** removes all listener functions previously added for the specified eventName. See below for the list of possible event names. */
    unbind: (eventName: ApiSoundCloud_Event) => void

    /** reloads the iframe element with a new widget specified by the url. All previously added event listeners will continue working. options is an object which allows you to define all possible widget parameters as well as a callback function which will be executed as soon as new widget is ready. See below for detailed list of widget parameters.
     * @param url
     * @param options
     */
    load: (url: string, options: any) => void

    /** plays the sound.
     */
    play: () => void

    /** pauses the sound.
     */
    pause: () => void

    /** toggles the sound.
     */
    toggle: () => void

    /** jumps to a certain position in a sound.
     * @param milliseconds
     */
    seekTo: (milliseconds: number) => void

    /** sets the widget volume to a certain value in the range 0-100.
     * @param volume
     */
    setVolume: (volume: number) => void

    /** skips to the next sound (only if the widget contains multiple sounds).
     */
    next: () => void

    /** skips to the previous sound (only if the widget contains multiple sounds).
     */
    prev: () => void

    /** jumps to the soundIndex sound, starting from 0 (only if the widget contains multiple sounds).
     * @param soundIndex
     */
    skip: (soundIndex: number) => void


    //*****
    // GETTER
    //*****

    /** returns the current volume, in the range of [0, 100].
     */
    getVolume: (callback: (value: number) => void) => void

    /** returns current sound duration in milliseconds.
     */
    getDuration: (callback: (value: number) => void) => void

    /** returns current sound position in milliseconds.
     */
    getPosition: (callback: (value: number) => void) => void

    /** returns the list of sound objects.
     */
    getSounds: (callback: (value: {[key: string]: unknown}) => void) => void

    /** returns current sound object.
     */
    getCurrentSound: (callback: (value: {[key: string]: unknown}) => void) => void

    /** returns the index of current sound.
     */
    getCurrentSoundIndex: (callback: (value: unknown) => void) => void

    /** whether the widget is paused.
     */
    isPaused: (callback: (value: boolean) => void) => void


}

