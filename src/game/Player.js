export default class Player {
    constructor() {
        this.x = 50;
        this.y = 140;
        this.width = 40;
        this.height = 47;
        this.ground = 140;

        // physics
        this.vy = 0;
        this.gravity = 0.8;
        this.jumpForce = -12;

        // sprite
        this.runImage = new Image();
        this.runImage.src = import.meta.env.BASE_URL + "assets/dino-run.png";

        this.jumpImage = new Image();
        this.jumpImage.src = import.meta.env.BASE_URL + "assets/dino.png";


        // animation
        this.frameIndex = 0;
        this.frameCount = 4;        // số frame trong sprite
        this.frameWidth = 144;       // chiều rộng 1 frame trong ảnh
        this.frameHeight = 180;
        this.frameTimer = 0;
        this.frameInterval = 6;     // càng nhỏ → chạy càng nhanh
    }

    jump() {
        if (this.y >= this.ground) {
        this.vy = this.jumpForce;
        }
    }

    update() {
        // gravity
        this.vy += this.gravity;
        this.y += this.vy;

        if (this.y >= this.ground) {
        this.y = this.ground;
        this.vy = 0;
        }

        // animation khi chạy
        if (this.y === this.ground) {
        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
            this.frameTimer = 0;
        }
        } else {
        this.frameIndex = 0;
        }
    }

    draw(ctx) {
        // nếu ảnh chưa load → không vẽ
        if (
            (this.y < this.ground && !this.jumpImage.complete) ||
            (this.y >= this.ground && !this.runImage.complete)
        ) {
            return;
        }

        if (this.y < this.ground) {
            ctx.drawImage(
            this.jumpImage,
            this.x,
            this.y,
            this.width,
            this.height
            );
        } else {
            ctx.drawImage(
            this.runImage,
            this.frameIndex * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
            );
        }
        // const h = this.getHitbox();
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(h.x, h.y, h.width, h.height);
    }


    getHitbox() {
        return {
            x: this.x + 8,
            y: this.y + 6,
            width: this.width - 16,
            height: this.height - 12
        };
    }

}
