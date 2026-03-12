export default (ctx, canvas, paddleProps) => {
    class Paddle {
        constructor(x) {
            this.x = x;
            this.y = canvas.height - 10;
            this.height = 20;
            this.width = paddleProps.width;
            this.colors = ["red", "#0088FF"];
        }
        move() {
            ctx.beginPath();
            
            // Add Glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = paddleProps.color;
            
            ctx.fillStyle = paddleProps.color;
            ctx.roundRect ? ctx.roundRect(this.x, this.y, this.width, this.height, 10) : ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();
            
            // Inner core
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Reset Glow
            ctx.shadowBlur = 0;
        }
    }

    let paddle = new Paddle(paddleProps.x);
    paddle.move();
    if (paddleProps.x <= 0) {
        paddleProps.x = 0;
    } else if (paddleProps.x + paddleProps.width >= canvas.width) {
        paddleProps.x = canvas.width - paddleProps.width;
    }
};