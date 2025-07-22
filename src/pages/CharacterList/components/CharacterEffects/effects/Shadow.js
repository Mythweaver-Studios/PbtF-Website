// src/pages/CharacterList/components/CharacterEffects/effects/Shadow.js

// --- Particle Class ---
class ShadowParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = -10; // Start off-screen top
        this.radius = Math.random() * 6 + 3;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = 1;
        this.maxLife = 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > this.canvas.height + this.radius) {
            this.reset();
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(156, 39, 176, ${this.opacity})`;
        this.ctx.shadowColor = '#9c27b0';
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

// --- Main Effect Logic ---
export function createShadowEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 20;
    let animationFrameId;

    function init() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new ShadowParticle(canvas));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0;
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const resizeObserver = new ResizeObserver(() => {
        init();
    });
    resizeObserver.observe(canvas.parentElement);

    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
    };
}