// @ts-check
import { rando } from "./modules/rando.js";
import { ScrollHandler } from "./modules/ScrollHandler.js";
import { Tab } from "./modules/Tab.js";


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


const $document = $(document);
const $navbar = $("#navbar");

// #region Highlighting current section's tab on scroll
const scroll_handler = new ScrollHandler(() => {
    const scrollTop = $document.scrollTop();
    const navbarHeight = $navbar.outerHeight();
    const scrollTopOffset = scrollTop + navbarHeight + 3;

    console.log(scrollTopOffset)
    $("#navbar .selected").removeClass("selected");

    for (let id of tab_ids) {
        const tab = tabs.get(id);
        let offset = tab.$section.offset();
        // offset can be null when home button is hidden
        if (offset && scrollTopOffset > offset.top) {
            tab.select(false);        
            return;
        }
    }

    // todo: fall back to last tab (how to get final id in dictioanry?)
});

// NOTE: reveerse order for scroll loop
const tab_ids = ["contact", "projects", "skills", "about", "home"];
/** dictionary of tabs keyed by id
 *  @type Map<string, Tab> */
const tabs = tab_ids.reduce((tabs, id) => tabs.set(id, new Tab(id, scroll_handler)), new Map());  

/*console.log(tabs);
for (let tab of tabs) {
    console.log(tab, tab[1].$section.offset().top)
}*/

$("#navbar button").on("click", function () {
    const tab = $(this).data("section").toString();
    if (tabs.has(tab)) {
        tabs.get(tab).select(true);
    }
});

scroll_handler.start();
// #endregion



