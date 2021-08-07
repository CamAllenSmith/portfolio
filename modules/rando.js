/** randomizes text in a div
 * @param $div {JQuery<HTMLElement>} $div to randomize
 * @param items {string[]} list of items to loop through 
 */
export function rando($div, items) {
    let index = -1;
    (function loop() {
        index = ++index % items.length;
        $div.text(items[index])
            .stop()
            .fadeIn(200, () => $div.fadeOut(5050, loop));
    })();
}


/**
 * returns random number between 0 and max value
 * @para mmax {number} maxmum value
 */
export function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

export function getRandom(arr) {
    if (arr.length) {
        return arr[getRandomNumber(arr.length)];
    }       
}