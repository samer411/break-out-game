export default class EffectsManager {
    constructor() {
        this.particles = [];
        this.trails = [];
        this.shakeIntensity = 0;
        this.shakeDecay = 0.9;
    }

    addParticle(x, y, dx, dy, radius, color, life) {
        this.particles.push({
            x,
            y,
            dx,
            dy,
            radius,
            color,
            life,
            maxLife: life,
            alpha: 1,
        });
    }

    createExplosion(x, y, color, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            const dx = Math.cos(angle) * speed;
            const dy = Math.sin(angle) * speed;
            const radius = Math.random() * 3 + 2;
            const life = Math.random() * 20 + 20;
            this.addParticle(x, y, dx, dy, radius, color, life);
        }
    }

    addTrail(x, y, radius, color) {
        this.trails.push({
            x,
            y,
            radius,
            color,
            life: 10,
            maxLife: 10,
            alpha: 0.5,
        });
    }

    triggerShake(intensity) {
        this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
    }

    applyShake(ctx) {
        if (this.shakeIntensity > 0.5) {
            const dx = (Math.random() - 0.5) * this.shakeIntensity;
            const dy = (Math.random() - 0.5) * this.shakeIntensity;
            ctx.translate(dx, dy);
            this.shakeIntensity *= this.shakeDecay;
            return { dx, dy };
        }
        return { dx: 0, dy: 0 };
    }

    restoreShake(ctx, dx, dy) {
        if (dx !== 0 || dy !== 0) {
            ctx.translate(-dx, -dy);
        }
    }

    updateAndDraw(ctx) {
        // DrawTrails
        for (let i = this.trails.length - 1; i >= 0; i--) {
            let trail = this.trails[i];
            trail.life--;
            trail.alpha = (trail.life / trail.maxLife) * 0.5;

            if (trail.life <= 0) {
                this.trails.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.shadowBlur = 10;
            ctx.shadowColor = trail.color || "#00ffff";
            ctx.arc(trail.x, trail.y, trail.radius * (trail.life / trail.maxLife), 0, Math.PI * 2);
            ctx.fillStyle = trail.color || "#00ffff";
            ctx.globalAlpha = trail.alpha;
            ctx.fill();
            ctx.globalAlpha = 1.0; // Reset alpha
            ctx.shadowBlur = 0; // Reset shadow
            ctx.closePath();
        }

        // Draw Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.x += p.dx;
            p.y += p.dy;
            p.life--;
            p.alpha = p.life / p.maxLife;

            // Add some gravity
            p.dy += 0.1;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1.0; // Reset alpha
            ctx.shadowBlur = 0; // Reset shadow
            ctx.closePath();
        }
    }
}
