export default class Ground {
    constructor(speed, canvasWidth, groundY) {
        this.speed = speed;
        this.y = groundY + 40; // nằm dưới chân khủng long

        this.image = new Image();
        this.image.src = import.meta.env.BASE_URL + "assets/ground.png";

        this.x1 = 0;
        this.x2 = canvasWidth;
        this.width = canvasWidth;
        this.height = 20;
    }

    update(speed) {
        this.speed = speed;
        this.x1 -= this.speed;
        this.x2 -= this.speed;

        if (this.x1 + this.width <= 0) {
        this.x1 = this.x2 + this.width;
        }

        if (this.x2 + this.width <= 0) {
        this.x2 = this.x1 + this.width;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x1, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
