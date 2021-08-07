// @ts-check
import { doCanvas } from "./modules/canvas.js";
import { rando } from "./modules/rando.js";
import { ScrollHandler } from "./modules/ScrollHandler.js";
import { Tab } from "./modules/Tab.js";


//history.scrollRestoration = "manual";  // don't remember scroll position on refresh

const $document = $(document);
const $navbar = $("#navbar");
const scroll_handler = new ScrollHandler(() => {
    var scrollTop = $document.scrollTop();
    var navbarHeight = $navbar.outerHeight();

    $("#navbar .selected").removeClass("selected");
    const scrollTopOffset = scrollTop + navbarHeight + 3;


    for (let id of tab_ids) {
        let tab = tabs.get(id);
        console.log(tab, id);
        if (scrollTopOffset > tab.$section.offset().top) {
            tab.select(false);
            return;
        }
    }

    // todo: fall back to last tab (how to get final id in dictioanry?)
});

// NOTE: reveerse order for scroll loop
const tab_ids = ["contact", "about", "home"];
/** dictionary of tabs keyed by id
 *  @type Map<string, Tab> */
const tabs = tab_ids.reduce((tabs, id) => tabs.set(id, new Tab(id, scroll_handler)), new Map());  

$("#navbar button").click(function () {
    const tab = $(this).data("section").toString();
    console.log(tab, tabs);
    if (tabs.has(tab)) {
        tabs.get(tab).select(true);
    }
});

scroll_handler.start();


// random title
rando($("#home .title"), [
    "Software Architect",
    "Project Manager",
    "Fullstack Developer",
    "Tech Entrepeneur",
    "Speaker/Mentor",
    "Database Specialist",
    "Web Designer",
    "Tech Lead",
    "ERP Specialist"
]);



// @ts-ignore
//doCanvas($("#home canvas").get(0));