export { get, clear };


function get(clearAfter = false) {
    // UPDATE: splitting by '&' BEFORE decoding. this allows parameters to contain '&'
    let urlParams = window.location.search.substring(1).split('&');

    /** @type {Object<string,string>} */
    let obj = {};

    for (var i = 0; i < urlParams.length; i++) {
        // important: decode NOW (after splitting by &) 
        // this converts codes like "%20" to " " and "%26" to "&"
        let prm = decodeURIComponent(urlParams[i]);

        let equalIndex = prm.indexOf("=");
        if (equalIndex > -1) {
            let key = prm.substring(0, equalIndex);
            let value = prm.substring(equalIndex + 1);
            obj[key] = value;
        }
    }

    if (clearAfter) {
        clear();
    }

    return obj;
}

function clear() {
    // if url parameters exist, clear them in history so if we refresh or hit the back button the url parameter will be gone
    const uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        const clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}

