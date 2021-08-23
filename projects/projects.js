/*
    IMPORTANT NOTES:
    
    weird race condition issue with custom components...
        - if script loads too soon, the constructor will execute before the inner content has been parsed
        - the easiest solution ive found is to defer the script
        - might need to implement that CSS rule that hides the element until its been reigstered now though 

*/








// #region adding styles and defining elements
function addStyle(href) {
    const link = document.createElement("link")
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

// unfortunately, custom fonts need to be loaded outside of shadow DOM to work
// also need to apply some outer styling (remove margin from body etc)
addStyle("/projects/projects_light.css");


customElements.define("side-nav", class extends HTMLElement {
    constructor() {
        super();

    
        const items = Array.from(this.querySelectorAll('item')).map(el => ({
            label: el.getAttribute("label"),
            section: document.getElementById(el.getAttribute("section"))
        }));
        
        console.log(items);


        this.shadow = this.attachShadow({ mode: "closed" });
        const css = /*css*/`
            :host {
                position: fixed;
                top: 6em;
                right: calc(50vw + 500px);
                text-align: right;
                align-items: flex-end;
                border: 1px solid red;
                background: rgba(0, 0, 0, 0.75);
                color: white;
                padding: 1em;
                display: flex;
                flex-direction: column;
                grid-row-gap: 1em;
                font-family: 'Open Sans', sans-serif;
            }
            div {
                cursor: pointer;
                border-bottom: 1px solid transparent;
            }
            div.active {
                color: #29abe2;
                border-bottom-color: #29abe2;
            }
            div:hover {
                color: red;
            }
            
        `;

        this.shadow.innerHTML = /*html*/` <style>${css}</style>`;

  
        /**
         * 
         * @param {HTMLElement} elem 
         * @param {number} top
         * @param {number} bottom
         * @returns 
         */
        const isWithinView = (elem, top, bottom) => elem.offsetTop >= top; // && (elem.offsetTop + elem.offsetHeight) <= bottom;
        

        items.forEach((item, i) => {
            const div = document.createElement("div");
            div.innerHTML = item.label;
            div.addEventListener("click", function() {
                console.log("CLICKED: ", item);
                item.section.scrollIntoView();
            });
            item.div = div;
            this.shadow.append(div);
        })


        
        document.addEventListener("scroll", () => {
            const top = window.scrollY;
            const bottom = top + window.innerHeight;
            
            this.shadow.querySelectorAll(".active").forEach(i => i.classList.remove("active"));

            for (let item of items) {
                if (isWithinView(item.section, top, bottom)) {
                    item.div.classList.add("active");
                    return;
                }
            }
            items[items.length-1].div.classList.add("active");
        }); 


    }

    connectedCallback() {

    }
});



customElements.define("project-container", class extends HTMLElement {

    /**
     * 
     * @param {string} attribute name of attribute to retrtieve comma delmimted string for
     */
    getTagHtml(attribute) {

        const test = this.getAttribute(attribute);

        console.log(attribute);

        console.log(test);
        const values = this.getAttribute(attribute)
            ?.split(",")
            ?.map(str => str.trim())
            ?.filter(str => str.length);

        if (values.length) {
            return /*html*/`
                <div class="tags">
                    ${values.map(value => "<div>" + value + "</div>").join("")}
                </div>
            `;
        }

        return "";
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = /*html*/` 
            <link rel="stylesheet" href="/projects/projects_shadow.css" />
            <style>:host { --color-accent: ${this.getAttribute("color")}; }</style>

            <nav id="navbar" class="center justify-center row gap">
                <a href="/">
                    <i class="fa fa-home"></i>
                    Home
                </a>
                <a href="/?section=about">
                    <i class="fa fa-user"></i>
                    About
                </a>
                <a href="/?section=skills">
                    <i class="fa fa-list"></i>
                    Skills
                </a>
                <a href="/?section=projects" class="selected">
                    <i class="fa fa-code-branch"></i>
                    Projects
                </a>
            </nav>

            <div id="landing">
                <div>
                    <img src="landing.jpg" />
                    <h1>${document.title}</h1>
                    ${this.getTagHtml("categories")}
                    ${this.getTagHtml("tags")}
                </div>
            </div>
            
            <div id="body">
                <div id="content">
                    ${Array.from(this.querySelectorAll("section")).map(section => /*html*/`
                        <header>${section.getAttribute("header")}</header>
                        ${section.outerHTML}   
                    `).join("")}
                </div>
            </div>

            <section id="footer" class="socials row center justify-center gap-50">
                <a class="fab fa-linkedin" href="https://www.linkedin.com/"></a>
                <a class="fab fa-github-square" href="https://github.com/CamAllenSmith"></a>
                <a class="fa fa-envelope-square" href="mailto:CamAllenSmith@gmail.com"></a>
            </section>

            <section id="footer2" class="center-align">
                Powered by <b class="italic">Handwritten Code</b>
            </section>
        `;
    }



    connectedCallback() {

    }
});
// #endregion

