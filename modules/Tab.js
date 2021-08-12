// @ts-check
export class Tab {

    /** The button this tab is linked to 
    * @type {JQuery<HTMLButtonElement>} */
    $button = null;

    /** The section this tab is linked to
    * @type {JQuery<HTMLElement>} */
    $section = null;


    /** @param id {string} the unique identifier for this tab. found in the "data-section" attribute of the navbar>button and the id of body>section
     * @param scroll_handler {import('./ScrollHandler.js').ScrollHandler} the handler to pause when scrolling into view */
    constructor(id, scroll_handler) {
        //this.id = id;
        this.$section = $("#" + id);
        this.$button = $("#navbar > button[data-section='" + id + "']");
        /** the scroll handler to pause when scrolling into view */
        this.scroll_handler = scroll_handler;
    }

    /** selects this tab, unselects all others, and scrolls into view
     * @param scroll {boolean} if true, scrolls section into view */
    select(scroll) {

        //console.log("selecting: " + this.id);

        $("#navbar .selected").removeClass("selected");
        this.$button.addClass("selected");

        if (scroll) {
            this.scrollTo(true);
        }
    }

    /** scrolls this.$section into view
     *  @param [animate] {boolean} if true, scroll takes 250ms otherwise its immediate */
    scrollTo(animate) {

        this.scroll_handler.stop();

        const top = this.$section.offset().top;
        console.log("scrolling to: " + top);

        //  id === 'home' ? 0 : $("#" + id).offset().top - $navbar.height()
        $("html").stop().animate(
            { scrollTop: top },
            animate ? 250 : 0,
            "swing",
            () => {
                console.log("done animating...");
                this.scroll_handler.start(false);
            }
        );
    }
}