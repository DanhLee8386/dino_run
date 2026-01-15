export default class Obstacle {
    constructor(speed) {
        this.x = 600;
        this.y = 140;
        this.width = 20;
        this.height = 45;
        this.speed = speed;

        this.image = new Image();
        this.image.src = import.meta.env.BASE_URL + "assets/cactus.png";
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // const h = this.getHitbox();
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(h.x, h.y, h.width, h.height);

    }

    getHitbox() {
        return {
            x: this.x + 4,
            y: this.y + 4,
            width: this.width - 8,
            height: this.height - 8
        };
    }

}
