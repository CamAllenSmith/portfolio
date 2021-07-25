//@ts-check
import { getRandom, getRandomNumber } from "./rando.js";



class Ball {
    constructor(canvas, images) {
        this.position = {
            x: getRandomNumber(canvas.width),
            y: getRandomNumber(canvas.height)
        };
        this.velocity = {
            x: getRandomNumber(canvas.width),
            y: getRandomNumber(canvas.height)
        }


        this.color = "red";
        this.image = getRandom(images);
        this.radius = 5;
        this.angle = getRandomNumber(360);
    }

    move(deltaTime) {
        this.position.x += (this.velocity.x * deltaTime);
        this.position.y += (this.velocity.y * deltaTime);
        this.angle += deltaTime;
        // TODO: bounce off wall
    }

    confine(canvas) {
        // right 
        if (this.position.x + this.image.width >= canvas.width) {
            this.position.x = canvas.width - this.image.width;
            this.velocity.x *= -1;
        }

        // left
        if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        }

        // down
        if (this.position.y + this.image.height >= canvas.height) {
            this.position.y = canvas.height - this.image.height;
            this.velocity.y *= -1;
        }

        // up
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        }

    }

    draw(ctx) {
        //ctx.fillStyle = this.color;
        //ctx.beginPath();
        //ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        //ctx.fill();


        ctx.save();

        ctx.moveTo(this.position.x, this.position.y);

 
        //ctx.rotate(this.angle);

        ctx.drawImage(this.image, 0, 0);//, this.radius, this.radius);
  
        //ctx.rotate(-this.angle);
        //ctx.moveTo(0, 0);
        ctx.restore();
    }
}


export function getImages(sources, progress, complete) {
    let index = 0;
    Promise.all(
        sources.map(source =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    progress({
                        index: ++index,
                        progress: index / sources.length
                    });
                    resolve(img);
                }
                img.src = "/img/" + source;
            })
        )
    ).then(complete);
}

/** @param {HTMLCanvasElement} canvas */
export function doCanvas(canvas) {
    const ctx = canvas.getContext("2d");


    function load(progress) {
        console.log("LOAD: ", progress);
    }

    function init(images) {
        console.log("INIT: ", images);


        const balls = [];
        for (var i = 0; i < 20; i++) {
            balls.push(new Ball(canvas, images));
        }

        let time = new Date().getTime();
        setInterval(function () {
            let newTime = new Date().getTime();
            const deltaTime = (newTime - time) / 1000;
            time = newTime;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // update
            balls.forEach(ball => {
                ball.move(deltaTime);
                ball.confine(canvas);
                ball.draw(ctx);
            });

            // render
            balls.forEach(ball => ball.draw(ctx));
        }, 1000 / 30);


        const $home = $("#home");
        $(window).on("resize", function () {
            console.log("hello");
            canvas.width = $home.outerWidth();
            canvas.height = $home.outerHeight();
        }).trigger("resize");

    }


    getImages(
        ["wow.png", "money.jpg", "3090.png", "dscim.png"],
        progress => load(progress),
        images => init(images)
    )

}