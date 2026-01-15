import { useEffect, useRef } from "react";
import Player from "../game/Player";
import Obstacle from "../game/Obstacle";
import { isColliding } from "../game/Collision";
import Ground from "../game/Ground";


export default function Game() {
  const canvasRef = useRef(null);
  let highScore = localStorage.getItem("highScore") || 0;


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const groundY = 140; // giống Player.ground
    let ground = new Ground(4, canvas.width, groundY);


    const player = new Player();
    let obstacles = [];
    let lastSpawn = 0;
    let speed = 4;
    let gameOver = false;
    let score = 0;

    function resetGame() {
        player.y = player.ground;
        player.velocityY = 0;

        obstacles = [];
        score = 0;
        speed = 4;
        gameOver = false;

        lastSpawn = 0;
        requestAnimationFrame(loop);
    }

    function loop(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Score: " + Math.floor(score), 450, 30);
        ctx.fillText("Highest: " + highScore, 450, 50);

        ground.update(speed);
        ground.draw(ctx);

        player.update();
        player.draw(ctx);
        score += 0.05; // chỉnh số này để nhanh/chậm
        if (!gameOver) {
            speed += 0.0005;
        }


        if (time - lastSpawn > 1500) {
            obstacles.push(new Obstacle(speed));
            lastSpawn = time;
        }

        obstacles.forEach(o => {
            o.update();
            o.draw(ctx);

            if (isColliding(player.getHitbox(), o.getHitbox())) {
            gameOver = true;
            }
        });

        obstacles = obstacles.filter(o => o.x + o.width > 0);

        if (gameOver) {
            ctx.fillStyle = "red";
            ctx.font = "24px Arial";
            ctx.fillText("GAME OVER", 220, 100);

            ctx.font = "14px Arial";
            ctx.fillText("Press R to Restart", 235, 130);
            return;
        }

        if (score > highScore) {
            localStorage.setItem("highScore", Math.floor(score));
        }

        if (!gameOver) {
            requestAnimationFrame(loop);
        }
    }

    requestAnimationFrame(loop);

    window.addEventListener("keydown", e => {
        if (e.code === "Space" && !gameOver) {
            player.jump();
        }

        if (e.code === "KeyR" && gameOver) {
            resetGame();
        }
    });

  }, []);

  return <canvas ref={canvasRef} width={600} height={200} />;
}
