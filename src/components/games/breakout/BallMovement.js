export function BallMovement(ctx, ballObj, effectsManager) {
    let data = new Ball(ballObj.x, ballObj.y, ballObj.rad);
    data.draw(ctx);
    ballObj.x += ballObj.dx;
    ballObj.y += ballObj.dy;
    if (effectsManager) {
        effectsManager.addTrail(ballObj.x, ballObj.y, ballObj.rad, "#58a6ff");
    }
}

class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }
    draw(ctx) {
        ctx.beginPath();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffff"; // Cyan glow
        
        ctx.fillStyle = "#00ffff";
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ffffff"; // White core
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        
        // Reset shadow for performance on other elements
        ctx.shadowBlur = 0;
    }
}