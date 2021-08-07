// @ts-check

export class ScrollHandler {
    /** the handle to previous setTimmeout call. used to cancel timeouts when new events come in
     * @type {number} */
    timer = null;

    /** number of milliseconds to wait before triggering onScroll. gets reset everytime a new scroll event is fired 
     * @type {number} */
    timeout = 50;

    /** @param onScroll {function} function to call when scroll event fires */
    constructor(onScroll) {
        /** The Handle for the scroll event. 
         * Sets a timeout to prevent calling onScroll on every single scroll event. Instead, it waits to {timeout} milliseconds of no scrolling before calling  
         * Requires arrow function to keep scope within context of ScrollHandler and not Window */
        this.handle = () => {
            //console.log("HANDLE. STOPPING TIMER: " + this.timer);
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                onScroll()
            }, this.timeout);
            //console.log("NEW TIMER: " + this.timer);
        }
      
    }

    /** starts listening for scroll events
     * @param [trigger] {boolean} if true, immediately triggers the scroll event */
    start(trigger = false) {
        console.log("starting..." + trigger + " | " + new Date().getTime());

        if (trigger) {
            //console.log("triggering");
            this.handle()
        }

        document.addEventListener("scroll", this.handle);

    }

    /** stops listening for scroll events */
    stop() {
        console.log("STOP TIMER = " + this.timer);
        window.clearTimeout(this.timer);
        document.removeEventListener("scroll", this.handle);
    }
}