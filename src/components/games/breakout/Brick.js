export default function Brick(level, bricks, canvas, brick) {
    brick.width = canvas.width / 5 - 1;
    let newbricks = [];
    if (!bricks) {
        return [];
    }
    // If all the levels are filled
    if (bricks.length >= 5 * level) {
        return;
    }

    // Brick Formation here
    for (let i = 0; i < 5 * level; i++) {
        let newBrick = new SingleBrick(
            brick.x + brick.width,
            brick.y,
            brick.width,
            brick.height,
            brick.colors
        );
        newbricks.push(newBrick);
        // newBrick.draw();
        brick.x += brick.width + 1;
        if (brick.x + brick.width >= canvas.width) {
            brick.x = 0.5;
            brick.y += brick.height + 1;
        }
    }
    return newbricks;
}

class SingleBrick {
    constructor(x, y, w, h, c) {
        this.x = x - w;
        this.y = y;
        this.width = w;
        this.height = h;
        this.colors = c;
        this.broke = false;
    }
    draw(ctx) {
        ctx.beginPath();
        let color = this.colors[Math.floor((this.x % 100) / 50) % this.colors.length] || this.colors[1];
        if(this.colors.length === 2 && this.y % 2 !== 0) {
           color = this.colors[0]; // just some pattern logic
        } else {
           color = this.colors[1];
        }

        ctx.fillStyle = this.broke ? "transparent" : color;
        
        if (!this.broke) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
        }

        ctx.roundRect ? ctx.roundRect(this.x, this.y, this.width, this.height, 5) : ctx.rect(this.x, this.y, this.width, this.height);
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.broke ? "transparent" : "rgba(255, 255, 255, 0.5)";
        ctx.fill();
        ctx.stroke();
        
        ctx.shadowBlur = 0;
    }
}